module.exports = {
    success: {
        s0: {
            code: "SpecialistCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "SpecialistUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "SpecialistFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "SpecialistDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoSpecialists",
            type: "success"
        },
        s6: {
            http: 200,
            code: "Activated",
            type: "success"
        }
    },
    error: {
        e0: {
            http: 404,
            code: "SpecialistNotFound",
            type: "error"
        }
    }
}