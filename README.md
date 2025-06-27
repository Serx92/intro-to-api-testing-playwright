# ✅ API Test Checklist

| #  | Endpoint                        | Method  | Scenario Description                           | Type        | Expected Status Code | Status |
|----|---------------------------------|---------|------------------------------------------------|-------------|----------------------|--------|
| 1  | /test-orders/1                  | GET     | Get order by valid ID                          | Positive    | 200 OK               | ✅     |
| 2  | /test-orders/11                 | GET     | Get order by invalid ID                        | Negative    | 400 Bad Request      | ✅     |
| 3  | /test-orders                    | POST    | Create order with valid data                   | Positive    | 200 OK               | ✅     |
| 4  | /test-orders                    | POST    | Create order with invalid data                 | Negative    | 400 Bad Request      | ✅     |
| 5  | /test-orders/1                  | PUT     | Update existing order with valid data          | Positive    | 200 OK               | ✅     |
| 6  | /test-orders/999                | PUT     | Update non-existing order                      | Negative    | 400 Bad Request      | ✅     |
| 7  | /test-orders/1                  | DELETE  | Delete existing order                          | Positive    | 204 NO_CONTENT       | ✅     |
| 8  | /test-orders/999                | DELETE  | Delete non-existing order                      | Negative    | 400 Bad Request      | ✅     |
