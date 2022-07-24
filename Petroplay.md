# 83 Quantity on Labor inside service must be decimal
1. Tasks (Manpower) must be decimal (1.0 , 1.1, 1.4) inside services
2. The endpoint it’s already accepting decimal numbers

# 84 Products inside services must bring decimals from Products registrations
1. Produtos (Products) must be decimal (1.0 , 1.1, 1.4) inside services
2. The endpoint it’s already accepting decimal numbers

# 87 TuneUps are Missing Vehicles Years (must be starting year to end year)
1. Must be able to reference that model year to tune-ups
2. Must be a multiple selection box
3. Must restrict to the version years available to that Model ID

# Test user
email: Finger.le@gmail.com
PWD: 12345678

# Endpoints
https://petroplus-api-test.herokuapp.com/v1

https://petroplus-api-test.herokuapp.com/v1/vehicles/models/{id}

# memo
You should show all userID that were appended to that order

just needed to show their avatar icon


"Must Add Recommended to Tune-Up Types"

QF
Quico Filho 5:21 PM
On tune-ups you should be able to add services and recommended products

right now trying to add recommended products it's not working

DELETE
/v1/tuneups/{tuneupId}/categories/{id}/bundled


POST
/v1/tuneups/{tuneupId}/categories/{id}/recommended


Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImY0ZTc2NDk3ZGE3Y2ZhOWNjMDkwZDcwZTIyNDQ2YTc0YjVjNTBhYTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGV0cm9wbGF5LXN0cCIsImF1ZCI6InBldHJvcGxheS1zdHAiLCJhdXRoX3RpbWUiOjE2NTQ1MzM4NTUsInVzZXJfaWQiOiIzcjF3eFFBVm55UkRiVVJpYmU2MUg0OWNueUUyIiwic3ViIjoiM3Ixd3hRQVZueVJEYlVSaWJlNjFINDljbnlFMiIsImlhdCI6MTY1NDUzMzg1NywiZXhwIjoxNjU0NTM3NDU3LCJlbWFpbCI6ImZpbmdlci5sZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZmluZ2VyLmxlQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.rffdChsWKN62jYBf8EGlzuBmH0uEIMk4zm1Kc07WR7P8Txf6LO8uTkMObXAYYuM1TF_83_6rn2Oz1p0bkB_aBHE_X280SWI7JJML5GMHDuRytM6_apY2xEfFUIyi5DaWh2nW9hnPDluzm56Djl8vLvxwkx6M5J1cnRDecY8X0GliCmf-8CpsgwzDHblcCOl6Po8ElVUtwr8_vVXvlcOP_97gx1ksrlBsEhlseasg-eXF4O_39v6Id4HE1uzxnwzGDxmwcWAPEg5z5rOkwSrU23S4TasnoZe_TnYV0hTTSsgQ6jck6-daLKZiTIflu3CJ7XIvx-pSpPUgc0fljJ3kYg

https://petroplus-api-test.herokuapp.com/v1/services/10e278e1-b322-462d-b6bd-44260b8115dd/items/dd312e23-0361-47a9-847e-8bea1eeb0988
https://petroplus-api-test.herokuapp.com/v1/services/10e278e1-b322-462d-b6bd-44260b8115dd/items/5edc78ed-5e2c-457d-a75d-67d20c418a32

            await api
              .post(`/tuneups/${previousCategories[previousCategoryIndex].tuneup_id}/categories/${previousCategories[previousCategoryIndex].id}/recommended`,{
                recommendedId: item.id
              })
              .then((res) => {
              })
              .catch(()=>{
              });


               "id": "f46b8e3c-0e54-4d81-8eff-a59a2374b17c",
      "name": "Francisco Coelho Filho",
      "document": "250.374.968-29",
      "client_id": "a0eb0074-bf4c-4b29-9008-c16218daaf43",
      "deleted_at": null,
      "phones": [
        {
          "created_at": "2022-06-03T19:53:08.650Z",
          "updated_at": "2022-06-03T19:53:08.650Z",
          "id": "5e5c1d4f-0f07-43bb-9c0d-657f0791ca85",
          "phone_type": "MOBL",
          "phone_number": "11111111111",
          "contact_name": nul,
          "customer_id": "f46b8e3c-0e54-4d81-8eff-a59a2374b17c"
        }
      ],
      "emails": [
        {
          "created_at": "2022-06-03T19:53:08.650Z",
          "updated_at": "2022-06-03T19:53:08.650Z",
          "id": "f1c72319-5d48-4549-8acb-46a2ff6caa3b",
          "email": "kikocoelho@me.com",
          "customer_id": "f46b8e3c-0e54-4d81-8eff-a59a2374b17c"
        }
      ],
      "addresses": [
        {
          "id": "20e90934-fbc7-4073-b684-3ccc87e41092",
          "address_name": "Default",
          "street": "Rua Capote Valente",
          "number": "80",
          "complement": "apt 316",
          "neighborhood": "Pinheiros",
          "city": "São Paulo",
          "state": "SP",
          "postal_code": "05409-000",
          "is_default": false,
          "customer_id": "f46b8e3c-0e54-4d81-8eff-a59a2374b17c"
        }
      ]
    }

    {
  "name": "vile",
  "document": "250.374.968-29",
  "phoneNumber": "11111111111"
  "phoneType": "MOBL",
  "email": "string",
  "address": {
    "addressName": "default",
    "street": "street",
    "number": "90",
    "complement": "vvileo",
    "neighborhood": "hero",
    "city": "São Paulo",
    "state": "st",
    "postalCode": "01119-000"
  },
  "clientId": "a0eb0074-bf4c-4b29-9008-c16218daaf43"
}


{
  "name": "vile",
  "document": "250.374.968-29",
  "phoneNumber": "11111111111"
  "phoneType": "MOBL",
  "email": "string",
  "address": {
    "addressName": "default",
    "street": "street",
    "number": "90",
    "complement": "vvileo",
    "neighborhood": "hero",
    "city": "São Paulo",
    "state": "st",
    "postalCode": "01119-000"
  },
  "clientId": "a0eb0074-bf4c-4b29-9008-c16218daaf43"
}