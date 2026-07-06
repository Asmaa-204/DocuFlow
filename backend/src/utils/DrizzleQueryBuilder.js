const { eq, gt, gte, lt, lte, and, asc, desc } = require("drizzle-orm");

/**
 * Converts `req.query` (?status=pending&createdAt[gte]=...&sort=-createdAt&fields=id,title)
 * into an options object compatible with Drizzle's `db.query.X.findMany({...})`:
 *   { where, orderBy, columns }
 *
 * `table` is a drizzle table object (its `.` properties are Columns).
 */
class DrizzleQueryBuilder {
  static operatorMap = { gte, gt, lte, lt };
  static excludeFields = ["sort", "fields", "page", "limit"];

  static _isPlainObject(e) {
    return typeof e === "object" && e !== null && !Array.isArray(e);
  }

  constructor(query, table) {
    this.query = query || {};
    this.table = table;
    this.queryObj = structuredClone(this.query);
    this.result = { where: undefined, orderBy: undefined, columns: undefined };
    for (const f of DrizzleQueryBuilder.excludeFields) delete this.queryObj[f];
  }

  filter() {
    const conds = [];
    for (const [key, value] of Object.entries(this.queryObj)) {
      const col = this.table[key];
      if (!col) continue;

      if (DrizzleQueryBuilder._isPlainObject(value)) {
        for (const [opKey, opValue] of Object.entries(value)) {
          const opFn = DrizzleQueryBuilder.operatorMap[opKey];
          if (opFn) conds.push(opFn(col, opValue));
        }
      } else {
        conds.push(eq(col, value));
      }
    }
    if (conds.length) this.result.where = and(...conds);
    return this;
  }

  sort() {
    if (!this.query.sort) return this;
    const fields = this.query.sort.split(",");
    const order = [];
    for (const raw of fields) {
      const field = raw.replace(/^[-+]/, "").trim();
      const col = this.table[field];
      if (!col) continue;
      order.push(raw.startsWith("-") ? desc(col) : asc(col));
    }
    if (order.length) this.result.orderBy = order;
    return this;
  }

  attributes() {
    if (!this.query.fields) return this;
    const requested = this.query.fields.split(",").map((f) => f.trim());
    const columns = {};
    for (const name of Object.keys(this.table)) {
      columns[name] = requested.includes(name);
    }
    this.result.columns = columns;
    return this;
  }

  /**
   * Merge extra AND conditions coming from the service layer
   * (equivalent to `filter.where = { ...filter.where, ...whereExtra }`).
   */
  andWhere(...extra) {
    const nonNull = extra.filter(Boolean);
    if (!nonNull.length) return this;
    this.result.where = this.result.where
      ? and(this.result.where, ...nonNull)
      : and(...nonNull);
    return this;
  }

  get() {
    // Drop undefined keys so drizzle doesn't get confused.
    const out = {};
    if (this.result.where) out.where = this.result.where;
    if (this.result.orderBy) out.orderBy = this.result.orderBy;
    if (this.result.columns) out.columns = this.result.columns;
    return out;
  }
}

module.exports = DrizzleQueryBuilder;
