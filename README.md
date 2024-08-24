## Introduction

This is a detailed guide for frontend dev's how to send payload to the following api's and the response are given below.

### Run this project locally
- Clone this repo
```bash
https://github.com/BayajidAlam/uddhar-server
```
- Navigate to folder
```bash
 cd uddhar-server
```
- Install yarn
```bash
    yarn
```
- Run your project

```bash 
    yarn dev
```


### Root url
```
    https://uddhar-server.vercel.app/api/v1
```

## create post (POST)
### url
```
    /lost-and-found/create-lost
```

### Examples

For create post of a lost persion your request body should be like following

#### Reqeust body

```
{
  "name": "Mr Bean",
  "age": 2,
  "description": "Black leather wallet",
  "clothes": "N/A",
  "address": "123 Main St",
  "placeWhereLost": "Central Park",
  "imageUrl": "http://example.com/images/lostwallet.jpg",
  "timeWhenLost": "2023-10-01T10:00:00.000Z",
  "postMakerId": "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
  "postedBy": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "contactNumber": "123-456-7890"
  }
}
```

#### Response would be like this
```
{
    "statusCode": 200,
    "success": true,
    "message": "Lost post created Successfully",
    "data": {
        "id": "7c6de40e-4f39-4585-ba09-3bce6c32f74b",
        "name": "Mr Bean",
        "age": 2,
        "description": "Black leather wallet",
        "clothes": "N/A",
        "address": "123 Main St",
        "placeWhereLost": "Central Park",
        "imageUrl": "http://example.com/images/lostwallet.jpg",
        "timeWhenLost": "2023-10-01T10:00:00.000Z",
        "isFound": false,
        "postMakerId": "2c347b16-4e45-45af-b362-4872c24db8cd",
        "createdAt": "2024-08-24T21:19:03.807Z",
        "updatedAt": "2024-08-24T21:19:03.807Z",
        "postedBy": {
            "id": "2c347b16-4e45-45af-b362-4872c24db8cd",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "contactNumber": "123-456-7890"
        }
    }
}
```

### Get all posts(GET)
### url
```
/lost-and-found?page=1&limit=10&sortBy=createdAt&sortOrder=desc&searchTerm=mr&isFound=false
```
### breakdwon of the url
- page = page number 
- limit = limit to fetch per page
- sortBy = sort by anything like (defalut: createdAt)
- sortOrder = sort in desc or asc (defalut: desc)
- searchTerm = search by name using searchTerm
- isFound = filter by this keyword

### Examples

get all lost person's post

### Response would be like this

```
{
    "statusCode": 200,
    "success": true,
    "message": "Lost and found post retrieved successfully",
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 6,
        "totalPage": 1
    },
    "data": [
        {
            "id": "7c6de40e-4f39-4585-ba09-3bce6c32f74b",
            "name": "Mr Bean",
            "age": 2,
            "description": "Black leather wallet",
            "clothes": "N/A",
            "address": "123 Main St",
            "placeWhereLost": "Central Park",
            "imageUrl": "http://example.com/images/lostwallet.jpg",
            "timeWhenLost": "2023-10-01T10:00:00.000Z",
            "isFound": false,
            "postMakerId": "2c347b16-4e45-45af-b362-4872c24db8cd",
            "createdAt": "2024-08-24T21:19:03.807Z",
            "updatedAt": "2024-08-24T21:19:03.807Z",
            "postedBy": {
                "id": "2c347b16-4e45-45af-b362-4872c24db8cd",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "contactNumber": "123-456-7890"
            }
        },
        {
            "id": "136825db-329d-43e3-ac53-151362710e6e",
            "name": "Lost Wallet",
            "age": 2,
            "description": "Black leather wallet",
            "clothes": "N/A",
            "address": "123 Main St",
            "placeWhereLost": "Central Park",
            "imageUrl": "http://example.com/images/lostwallet.jpg",
            "timeWhenLost": "2023-10-01T10:00:00.000Z",
            "isFound": false,
            "postMakerId": "2c347b16-4e45-45af-b362-4872c24db8cd",
            "createdAt": "2024-08-24T20:39:09.039Z",
            "updatedAt": "2024-08-24T20:39:09.039Z",
            "postedBy": {
                "id": "2c347b16-4e45-45af-b362-4872c24db8cd",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "contactNumber": "123-456-7890"
            }
        },
        {
            "id": "ca473613-a64c-4c8d-b58d-d0756385e4a9",
            "name": "Lost Wallet",
            "age": 2,
            "description": "Black leather wallet",
            "clothes": "N/A",
            "address": "123 Main St",
            "placeWhereLost": "Central Park",
            "imageUrl": "http://example.com/images/lostwallet.jpg",
            "timeWhenLost": "2023-10-01T10:00:00.000Z",
            "isFound": false,
            "postMakerId": "2c347b16-4e45-45af-b362-4872c24db8cd",
            "createdAt": "2024-08-24T20:38:32.733Z",
            "updatedAt": "2024-08-24T20:38:32.733Z",
            "postedBy": {
                "id": "2c347b16-4e45-45af-b362-4872c24db8cd",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "contactNumber": "123-456-7890"
            }
        },
        {
            "id": "5deeea25-93cf-444c-abfd-a738ecd9661d",
            "name": "Lost Wallet",
            "age": 2,
            "description": "Black leather wallet",
            "clothes": "N/A",
            "address": "123 Main St",
            "placeWhereLost": "Central Park",
            "imageUrl": "http://example.com/images/lostwallet.jpg",
            "timeWhenLost": "2023-10-01T10:00:00.000Z",
            "isFound": false,
            "postMakerId": "2c347b16-4e45-45af-b362-4872c24db8cd",
            "createdAt": "2024-08-24T20:17:24.345Z",
            "updatedAt": "2024-08-24T20:17:24.345Z",
            "postedBy": {
                "id": "2c347b16-4e45-45af-b362-4872c24db8cd",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "contactNumber": "123-456-7890"
            }
        },
        {
            "id": "afd0f522-ba94-476b-b004-f9d3d4b66aaa",
            "name": "Lost Wallet",
            "age": 2,
            "description": "Black leather wallet",
            "clothes": "N/A",
            "address": "123 Main St",
            "placeWhereLost": "Central Park",
            "imageUrl": "http://example.com/images/lostwallet.jpg",
            "timeWhenLost": "2023-10-01T10:00:00.000Z",
            "isFound": false,
            "postMakerId": "2c347b16-4e45-45af-b362-4872c24db8cd",
            "createdAt": "2024-08-24T20:17:13.549Z",
            "updatedAt": "2024-08-24T20:17:13.549Z",
            "postedBy": {
                "id": "2c347b16-4e45-45af-b362-4872c24db8cd",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "contactNumber": "123-456-7890"
            }
        },
        {
            "id": "4a60a3b1-acb1-447d-8d79-70f9a0422061",
            "name": "Lost Wallet",
            "age": 2,
            "description": "Black leather wallet",
            "clothes": "N/A",
            "address": "123 Main St",
            "placeWhereLost": "Central Park",
            "imageUrl": "http://example.com/images/lostwallet.jpg",
            "timeWhenLost": "2023-10-01T10:00:00.000Z",
            "isFound": false,
            "postMakerId": "2c347b16-4e45-45af-b362-4872c24db8cd",
            "createdAt": "2024-08-24T20:14:31.106Z",
            "updatedAt": "2024-08-24T20:14:31.106Z",
            "postedBy": {
                "id": "2c347b16-4e45-45af-b362-4872c24db8cd",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "contactNumber": "123-456-7890"
            }
        }
    ]
}
```

### Update Status of isFound if person is found(PATCH)
### url
```
/lost-and-found/2b7a2b0f-7532-4a88-8b38-e2e5d2618268
```

### Examples

Body would be isFound true or false
``` 
{
    "isFound": true
}
```

```
{
    "statusCode": 200,
    "success": true,
    "message": "Status Updated Successfully",
    "data": {
        "id": "2b7a2b0f-7532-4a88-8b38-e2e5d2618268",
        "name": "Mr Bean",
        "age": 2,
        "description": "Black leather wallet",
        "clothes": "N/A",
        "address": "123 Main St",
        "placeWhereLost": "Central Park",
        "imageUrl": "http://example.com/images/lostwallet.jpg",
        "timeWhenLost": "2023-10-01T10:00:00.000Z",
        "isFound": true,
        "postMakerId": "2c347b16-4e45-45af-b362-4872c24db8cd",
        "createdAt": "2024-08-24T20:39:56.958Z",
        "updatedAt": "2024-08-24T21:18:53.120Z",
        "postedBy": {
            "id": "2c347b16-4e45-45af-b362-4872c24db8cd",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "contactNumber": "123-456-7890"
        }
    }
}
```
