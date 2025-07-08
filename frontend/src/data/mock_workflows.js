export const mockWorkflows = {
    "1": { // Car Purchase Definition
        name: "Car Purchase Workflow",
        stages: [
            { id: "customer_submits_id", name: "Submit ID" },
            { id: "dealer_prepares_docs", name: "Dealer Prep" },
            { id: "police_approval", name: "Police Approval" },
            { id: "dealer_final_signature", name: "Dealer Signature" },
            { id: "customer_receives_contract", name: "Contract Received" }
        ]
        // ... other parts of the definition
    },
    "2": { // Kid Adoption Definition
        name: "Kid Adoption Workflow",
        stages: [
            { id: "applicant_papers", name: "Applicant Papers" },
            { id: "orphanage_review", name: "Orphanage Review" },
            { id: "mayor_approval", name: "Mayor Approval" },
            { id: "final_delivery", name: "Final Delivery" }
        ]
        // ... other parts of the definition
    }
};