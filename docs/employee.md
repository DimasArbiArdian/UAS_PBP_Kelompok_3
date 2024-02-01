# Employee API Spec

## Create Employee API

Endpoint : POST /api/employees

Headers : 
- Authorization : token

Request Body :

```json
{
  "name" : "Dimas Arbi Ardian",
  "position" : "Direktur Utama",
  "salary" : "50 juta",
  "email" : "dimas.arbi_ti22@nusaputra.ac.id",
  "phone" : "085872834600",
  "address" : "Jl. Cisaat, Sukabumi"
}
```

Response Body Success : 

```json
{
  "data" : {
    "id" : 1,
    "name" : "Dimas Arbi Ardian",
    "position" : "Direktur Utama",
    "salary" : "50 juta",
    "email" : "dimas.arbi_ti22@nusaputra.ac.id",
    "phone" : "085872834600",
    "address" : "Jl. Cisaat, Sukabumi"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Email or Phone is not valid format"
}
```

## Update Employee API

Endpoint : PUT /api/employees/:id

Headers :
- Authorization : token

Request Body :

```json
{
  "name" : "Dimas Arbi Ardian",
  "position" : "Direktur Utama",
  "salary" : "50 juta",
  "email" : "dimas.arbi_ti22@nusaputra.ac.id",
  "phone" : "085872834600",
  "address" : "Jl. Cisaat, Sukabumi"
}
```

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
    "name" : "Dimas Arbi Ardian",
    "position" : "Direktur Utama",
    "salary" : "50 juta",
    "email" : "dimas.arbi_ti22@nusaputra.ac.id",
    "phone" : "085872834600",
    "address" : "Jl. Cisaat, Sukabumi"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Email or Phone is not valid format"
}
```

## Get Employee API

Endpoint : GET /api/employees/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
    "name" : "Dimas Arbi Ardian",
    "position" : "Direktur Utama",
    "salary" : "50 juta",
    "email" : "dimas.arbi_ti22@nusaputra.ac.id",
    "phone" : "085872834600",
    "address" : "Jl. Cisaat, Sukabumi"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Employee is not found"
}
```

## Search Employee API

Endpoint : GET /api/employees

Headers :
- Authorization : token

Query params :
- name : Search by name, using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data" : [
    {
      "id" : 1,
      "name" : "Dimas Arbi Ardian",
      "position" : "Direktur Utama",
      "salary" : "50 juta",
      "email" : "dimas.arbi_ti22@nusaputra.ac.id",
      "phone" : "085872834600",
      "address" : "Jl. Cisaat, Sukabumi"
    },
    {
      "id" : 2,
      "name" : "Dimas Arbi Ardian",
      "position" : "Direktur Utama",
      "salary" : "50 juta",
      "email" : "dimas.arbi_ti22@nusaputra.ac.id",
      "phone" : "085872834600",
      "address" : "Jl. Cisaat, Sukabumi"
    }
  ],
  "paging" : {
    "page" : 1,
    "total_page" : 3,
    "total_item" : 30
  }
}
```

Response Body Error :

## Remove Employee API

Endpoint : DELETE /api/employees/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Employee is not found"
}
```
