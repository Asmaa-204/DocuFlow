export const mockInstances = [
    {
        id: "inst_005",
        workflow_definition_id: "1",
        current_stage: "police_approval",
        status: "in_progress",
        started_by_user_id: "user_E_345",
        start_datetime: "2025-07-01T14:00:00Z",
        last_updated_datetime: "2025-07-06T10:15:00Z",
        data: {
            customer_name: "Eve Adams",
            car_make: "Ford",
            car_model: "Focus",
            vin: "GHI789JKL345",
            dealer_id: "dealer_MNO",
            customer_id_doc_status: "verified",
            all_docs_attached: true
        },
        assigned_to_user_id: "police_officer_101"
    },
    {
        id: "inst_006",
        workflow_definition_id: "2",
        current_stage: "mayor_approval",
        status: "in_progress",
        started_by_user_id: "user_F_678",
        start_datetime: "2025-06-20T09:30:00Z",
        last_updated_datetime: "2025-07-05T15:00:00Z",
        data: {
            applicant_name: "Frank White",
            kid_gender_preference: "female",
            kid_age_range: "6-8",
            orphanage_review_status: "approved",
            orphanage_id: "orphanage_PQR"
        },
        assigned_to_user_id: "mayor_of_town_222"
    },
    {
        id: "inst_007",
        workflow_definition_id: "1",
        current_stage: "customer_submits_id",
        status: "pending_input",
        started_by_user_id: "user_G_901",
        start_datetime: "2025-07-07T09:00:00Z",
        last_updated_datetime: "2025-07-07T09:00:00Z",
        data: {
            customer_name: "Grace Lee",
            car_make: "Nissan",
            car_model: "Altima",
            dealer_id: "dealer_STU"
        },
        assigned_to_user_id: "user_G_901"
    },
    {
        id: "inst_008",
        workflow_definition_id: "2",
        current_stage: "final_delivery",
        status: "completed",
        started_by_user_id: "user_H_234",
        start_datetime: "2025-06-01T10:00:00Z",
        last_updated_datetime: "2025-07-04T11:00:00Z",
        data: {
            applicant_name: "Harry Potter",
            kid_name: "Lily",
            mayor_approval_date: "2025-07-01",
            delivery_scheduled_date: "2025-07-04"
        },
        assigned_to_user_id: "user_H_234"
    }
];