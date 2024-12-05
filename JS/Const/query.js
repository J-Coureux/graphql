
// the query graphQL get all the data necessary to display a page intra for the connected user 
export const query = `
{
    user (order_by: { login: asc }) {
        login
        attrs
        campus
        auditRatio
        totalUp
        totalDown

        xps {
            amount
            path
        }
    }

    transaction {
        type
        amount
        attrs
        createdAt
        path
      
      	object {
            type
        }
    }

    result {
        createdAt
        grade
        attrs
        type
        path
        version
        isLast
        campus

      	object {
          name
          type
        }
    }

    audit {
        createdAt
        endAt

        group {
            captainLogin
            status
            object {
                name
            }
        }
        
        auditor {
            login
        }
        
        private {
            code
        }
    }

    event_user {
        level
        userAuditRatio
        userLogin
        userId
        createdAt

        event {
            path
        }
    }

    event {
        campus
        createdAt
        description
        startAt
        endAt
        path

        object {
            name
        }
    }
}`