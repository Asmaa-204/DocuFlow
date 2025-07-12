const { Op, and } = require("sequelize");

class SequelizeQueryBuilder 
{
  static operatorMap = {
      gte: Op.gte,
      gt: Op.gt,
      lte: Op.lte,
      lt: Op.lt
  }

  static excludeFields = ["sort", "fields", "page", "limit"]

  static _isPlainObject(e)
  {
    return (
      typeof e == "object" &&
      e != null &&
      !Array.isArray(e)
    )
  }

  constructor(query) {
    
    this.query = query;
    this.queryObj = structuredClone(query);
    this.filter_ = {};

    this._cleanQuery()
  }

  _cleanQuery() 
  {
    SequelizeQueryBuilder.excludeFields.forEach(field => delete this.queryObj[field]);
  }

  filter() 
  {
    this.filter_.where = {};

    for (const [key, value] of Object.entries(this.queryObj)) 
    {
      if (SequelizeQueryBuilder._isPlainObject(value)) 
      {
        this.filter_.where[key] = {};
        for (const [opKey, opValue] of Object.entries(value)) 
        {
          const sequelizeOp = SequelizeQueryBuilder.operatorMap[opKey];
          if (sequelizeOp) 
          {
            this.filter_.where[key][sequelizeOp] = opValue;
          }
        }
      } 
      else 
      {
        this.filter_.where[key] = value;
      }
    }

    return this;
  }

  sort() 
  {
    if (this.query.sort) 
    {
      const sortFields = this.query.sort.split(',');

      this.filter_.order = sortFields.map(field => {
        if (field.startsWith('-')) {
          return [field.slice(1).trim(), 'DESC'];
        } else if (field.startsWith('+')) {
          return [field.slice(1).trim(), 'ASC'];
        } else {
          return [field.trim(), 'ASC'];
        }
      });
    }

    return this;
  }

  attributes() 
  {
    if (this.query.fields) {
      this.filter_.attributes = this.query.fields.split(',');
    }
    return this;
  }

  get()
  {
    return this.filter_
  }

}

module.exports = SequelizeQueryBuilder

