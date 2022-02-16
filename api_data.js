define({ "api": [
  {
    "group": "Appendix",
    "type": "",
    "url": "/",
    "title": "Booking Format",
    "name": "Booking_Format",
    "version": "201907.0.1",
    "description": "<p>Please <a href=\"https://github.com/MyAllocator/build2us-apidocs/blob/gh-pages/booking_format_b2u.md\">check this document</a> for all possible booking fields, their meanings and the pricing relations.</p>",
    "filename": "./build2us.pm",
    "groupTitle": "Appendix"
  },
  {
    "group": "Appendix",
    "type": "",
    "url": "/",
    "title": "Error Codes",
    "name": "Error_Codes",
    "version": "202006.0.1",
    "description": "<p>You can respond with error IDs listed in our <a href=\"https://apidocs.myallocator.com/ota-errors.html\">error code list</a>. Please use the numeric codes in the <code>ID</code> column. Only errors whose code starts with <code>FAULT.OTA.</code> are supported.</p>",
    "filename": "./build2us.pm",
    "groupTitle": "Appendix"
  },
  {
    "group": "Appendix",
    "type": "",
    "url": "/",
    "title": "Rate plan support",
    "name": "Rate_plan_support",
    "version": "201707.0.1",
    "description": "<p>If your OTA supports rate plans make sure that:</p> <ol> <li>You've implemented the <code>GetRatePlans</code> API call.</li> <li>You've told us that you support rate plans, and that we've enabled rate plan support for your OTA.</li> <li>You've implemented the &quot;close&quot; restriction for <code>ARIUpdate</code> calls.</li> <li>You return rate plan details in the bookings. Specifically <code>RateId</code>/<code>RateDesc</code> on the <code>Rooms</code> level, and <code>RateId</code> on the <code>Rooms/DayRates</code> level.</li> </ol> <p>On myallocator rooms and rate plans have a one-to-many relationship. This means that a room has one or more rate plans, and each rate plan has exactly one room. For the <code>ARIUpdate</code> calls we can send different <code>ota_rate_id</code> values for the same <code>ota_room_id</code>. Rates and restrictions are tied to rate plans, while availability is tied to rooms, so the <code>units</code> will be constant across different rate plans for the same dates and for the same room, but rates and restrictions can vary. To close off a rate plan we are using the <code>close</code> flag.</p>",
    "filename": "./build2us.pm",
    "groupTitle": "Appendix"
  },
  {
    "group": "Appendix",
    "type": "",
    "url": "/",
    "title": "RoomInfo",
    "name": "RoomInfo",
    "version": "201707.0.1",
    "success": {
      "fields": {
        "Response": [
          {
            "group": "Response",
            "type": "Object[]",
            "optional": false,
            "field": "RoomInfo",
            "description": "<p>Array of room information objects</p>"
          },
          {
            "group": "Response",
            "type": "Number",
            "optional": false,
            "field": "RoomInfo/mya_room_id",
            "description": "<p>myallocator room type ID</p>"
          },
          {
            "group": "Response",
            "type": "Number",
            "optional": true,
            "field": "RoomInfo/ota_room_id",
            "description": "<p>channel room ID (if mapped)</p>"
          },
          {
            "group": "Response",
            "type": "Number",
            "optional": false,
            "field": "RoomInfo/beds",
            "description": "<p>Number of beds in the room type</p>"
          },
          {
            "group": "Response",
            "type": "Number",
            "optional": false,
            "field": "RoomInfo/units",
            "description": "<p>Number of rooms of this type</p>"
          },
          {
            "group": "Response",
            "type": "Boolean",
            "optional": false,
            "field": "RoomInfo/dormitory",
            "description": "<p>Whether it's a dorm (shared room) or private room.</p>"
          },
          {
            "group": "Response",
            "type": "String",
            "optional": false,
            "field": "RoomInfo/label",
            "description": "<p>Short name referencing the room type.</p>"
          },
          {
            "group": "Response",
            "type": "String",
            "optional": true,
            "field": "RoomInfo/description",
            "description": "<p>A longer description of the room.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Room Info example",
          "content": "{\n    \"RoomInfo\": [\n        {\n            \"images\": [\n                {\n                    \"url\": \"https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c37.jpg\",\n                    \"description\": \"View from balcony\",\n                    \"sort_order\": 1\n                },\n                {\n                    \"url\": \"https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c38.jpg\",\n                    \"description\": \"Inside View\",\n                    \"sort_order\": 2\n                }\n            ],\n            \"beds\": 1,\n            \"dormitory\": false,\n            \"label\": \"Single Room\",\n            \"description\": \"Single Room with a sea view\",\n            \"mya_room_id\": \"1234\",\n            \"ota_room_id\": \"\",\n            \"units\": 10\n        },\n        {\n            \"images\": [\n                {\n                    \"url\": \"https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c39.jpg\",\n                    \"description\": \"Jacuzzi\",\n                    \"sort_order\": 1\n                },\n                {\n                    \"url\": \"https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c40.jpg\",\n                    \"description\": \"Double Bed\",\n                    \"sort_order\": 2\n                }\n            ],\n            \"beds\": 2,\n            \"dormitory\": false,\n            \"label\": \"Double Room\",\n            \"description\": \"Double Room with a jacuzzi\",\n            \"mya_room_id\": \"2345\",\n            \"ota_room_id\": \"\",\n            \"units\": 15\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>RoomInfo (if enabled for your OTA by us) is conditionally returned in the <code>SetupProperty</code> and <code>GetRoomTypes</code> call, and can also be accessed via the <code>RoomInfo</code> callback. To save bandwidth <code>RoomInfo</code> is only returned in <code>SetupProperty</code>/<code>GetRoomTypes</code> if it is explicitly enabled in the OTA configuration on myallocator.  The <code>RoomInfo</code> callback is always available. <code>RoomInfo</code> is only necessary for deep integrations or situations where the OTA plans to automatically/create destroy rooms using myallocator configuration. In a normal integration this isn't very usual.</p>",
    "filename": "./build2us.pm",
    "groupTitle": "Appendix"
  },
  {
    "group": "Appendix",
    "type": "",
    "url": "/",
    "title": "Special Considerations",
    "name": "Special_Considerations",
    "version": "201707.0.1",
    "description": "<p>HTTP requests have the content-type <code>application/json</code>, with the payload being in the body of the request. Gzip compression and keep-alives will be used if supported. HTTPS (SSL encryption) is required for your endpoint.</p> <p>HTTP response codes from myallocator should always be 200. They have the content-type <code>application/json</code>.</p> <p>Note that the <code>success</code> field should have boolean type. All other data types in <code>success</code> field will cause a <code>FAULT.API.INVALID_SUCCESS</code> error.</p>",
    "filename": "./build2us.pm",
    "groupTitle": "Appendix"
  },
  {
    "group": "Appendix",
    "type": "",
    "url": "/",
    "title": "Terminology",
    "name": "Terminology",
    "version": "201707.0.1",
    "description": "<table> <thead> <tr> <th> </th> <th> </th> </tr> </thead> <tbody> <tr> <td>OTA</td> <td>Online travel agency (ex: booking.com, or competitor)</td> </tr> <tr> <td>cid</td> <td>Channel ID - a two to four character code used by myallocator uniquely identify a OTA.</td> </tr> <tr> <td>verb</td> <td>The action being performed. HealthCheck, SetupProperty, GetRoomTypes, GetBookingList, GetBookingId, SetAvailability.</td> </tr> <tr> <td>mya_property_id</td> <td>The myallocator property ID (included for debugging requests and support tickets)</td> </tr> <tr> <td>ota_property_id</td> <td>The property ID on the OTA (can be a user name or similar alphanumeric ID)</td> </tr> <tr> <td>guid</td> <td>A unique 36 character code which identifies a request. For highest security an ota should only accept/process a GUID once (to avoid replay attacks). Useful for seeing if a request is a retry. This is mostly used to introduce entropy into the request.</td> </tr> <tr> <td>shared_secret</td> <td>A shared secret between the OTA and myallocator.</td> </tr> <tr> <td>booking_id</td> <td>The booking ID on the OTA of a particular reservation.</td> </tr> </tbody> </table>",
    "filename": "./build2us.pm",
    "groupTitle": "Appendix"
  },
  {
    "group": "Callback_URLs__Optional_",
    "type": "POST|GET",
    "url": "/callback/ota/{cid}/v201506/ARIFullRefresh",
    "title": "ARIFullRefresh",
    "name": "ARIFullRefresh",
    "version": "201707.0.1",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "shared_secret",
            "description": "<p>secret</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "mya_property_id",
            "description": "<p>myallocator property ID</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "ota_property_id",
            "description": "<p>property ID on OTA side</p>"
          }
        ]
      }
    },
    "description": "<p>This is for technical support on the remote OTA to enqueue a full refresh of the property. You may use either <code>ota_property_id</code> (it may be resolved into a number of myallocator IDs) or <code>mya_property_id</code>.</p> <p>Note that full refreshes are usually heavy operations, so only call this when absolutely neccessary.</p>",
    "filename": "./build2us.pm",
    "groupTitle": "Callback_URLs__Optional_"
  },
  {
    "group": "Callback_URLs__Optional_",
    "type": "POST|GET",
    "url": "/callback/ota/{cid}/v201506/BookingCreate",
    "title": "BookingCreate",
    "name": "BookingCreate",
    "version": "201707.0.1",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "shared_secret",
            "description": "<p>secret</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "mya_property_id",
            "description": "<p>myallocator property ID</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "ota_property_id",
            "description": "<p>property ID on OTA side</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "booking_json",
            "description": "<p>see booking samples</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Format of Payment Data",
          "content": "\"Payments\" : [\n      {\n      \"CardCode\" : \"VI\", // Required. See above link for accepted card codes\n      \"CardNumber\" : 5111111111111111, // Required\n      \"SeriesCode\" : 111, // Three digit CVV number from back of card\n      \"ExpireDate\" : 0417,\n      \"CardHolderName\" : \"John Smith\",\n      \"Address\" : {\n         \"AddressLine\" : \"123 Street Lane\",\n         \"CityName\" : \"City\",\n         \"StateCode\" : \"LA\",\n         \"CountryCode\" : \"USA\",\n         \"PostalCode\" : 12345\n      }\n   }\n]",
          "type": "json"
        }
      ]
    },
    "header": {
      "examples": [
        {
          "title": "Response Header",
          "content": "{\"Content-type\":\"application/json\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n        \"success\":true\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>You may use either <code>ota_property_id</code> (it may be resolved into a number of myallocator IDs) or <code>mya_property_id</code>. You can also send payment information in the <code>booking_json</code> field that will be encrypted and stored in myallocator. Please see the example of format below (or see full booking examples <a href=\"https://github.com/MyAllocator/bookingsamples\">here</a>). If including payment data, insert the <code>Payments</code> array inside the <code>Booking</code> hash (see the <a href=\"https://myallocator.github.io/build2us-apidocs/index.html#success-examples-SDK_Reference-GetBookingId-201707_0_1-0\">Minimal Booking Example</a>). The only required fields are <code>CardCode</code> and <code>CardNumber</code>. The remaining fields aren't required, but encouraged. Here is a list of <a href=\"https://github.com/MyAllocator/apidocs/blob/gh-pages/card-list.md\">accepted card codes</a>.</p> <p><strong>IMPORTANT</strong>: If you implement <code>BookingCreate</code> you must also implement retry logic. Please do not retry more than once per minute. Additionally the system will block multiple concurrent requests for the same property.</p>",
    "filename": "./build2us.pm",
    "groupTitle": "Callback_URLs__Optional_"
  },
  {
    "group": "Callback_URLs__Optional_",
    "type": "",
    "url": "/callback/ota/{cid}/v201506/ChannelList",
    "title": "ChannelList",
    "name": "ChannelList",
    "version": "201707.0.1",
    "header": {
      "examples": [
        {
          "title": "Response Header",
          "content": "{\"Content-type\":\"application/json\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n    \"channels\":[\n            { \"cid\":\"boo\", \"pretty\":\"Booking.com\", \"icon-url\":\"https://www.fullpath/to/cdn/image\" },\n            { \"cid\":\"exp\", \"pretty\":\"Expedia\", \"icon-url\":\"https://www.fullpath/to/cdn/image\" }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./build2us.pm",
    "groupTitle": "Callback_URLs__Optional_"
  },
  {
    "group": "Callback_URLs__Optional_",
    "type": "POST|GET",
    "url": "/callback/ota/{cid}/v201506/RoomInfo",
    "title": "RoomInfo",
    "name": "RoomInfo",
    "version": "201707.0.1",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "shared_secret",
            "description": "<p>secret</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "mya_property_id",
            "description": "<p>myallocator property ID</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Response Header",
          "content": "{\"Content-type\":\"application/json\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n        \"RoomInfo\":[ .. ] // see RoomInfo Appendix\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./build2us.pm",
    "groupTitle": "Callback_URLs__Optional_"
  },
  {
    "group": "Getting_Started",
    "type": "",
    "url": "/",
    "title": "Step 1: Getting Started",
    "name": "Step_1",
    "version": "201707.0.1",
    "description": "<ul> <li>To be considered as a partner, please complete our <a href=\"https://www.cloudbeds.com/partner-with-cloudbeds/\">Partnership form</a>.</li> <li>Once submitted, your application will be placed in queue to be reviewed for fit and compatibility. We will reach out if the partnership is approved. <ul> <li>In addition to an approval notification, you will be provided with a 72-hour link to our API Credential Request form, which will help you create a test account and define your channel on myallocator.</li> <li>Upon completion of the API Credential Request form, you will be sent Test Account login information, Channel ID (cid), and the shared_secret that is required for the API calls.</li> </ul> </li> <li>At this point... <ul> <li>The channel will be hidden from our user base while in development and only viewable by your designated test account.</li> <li>You will be able to use your trial account as a test harness for sending updates to your channel.</li> <li>We request that you update our team at least once every two weeks while in development with your estimated completion date.</li> <li>Partners that fail to provide an estimated completion date may have their participation eligibility rescinded.</li> <li>When you are finished with development please email <a href=\"mailto:connectivity@myallocator.com\">connectivity@myallocator.com</a> to schedule certification.</li> </ul> </li> <li>Once certified, our team will inform you of next steps, including providing us with: <ul> <li>Logos</li> <li>Information about your serivce</li> <li>Property setup information (obtaining setup credentials, activating the channel manager, etc.)</li> <li>Contact Information to various departments of your business (support, marketing, etc.)</li> </ul> </li> </ul>",
    "filename": "./build2us.pm",
    "groupTitle": "Getting_Started"
  },
  {
    "group": "Getting_Started",
    "type": "",
    "url": "/",
    "title": "Step 2: Configure property on myallocator and OTA",
    "name": "Step_2",
    "version": "201707.0.1",
    "description": "<p><img src=\"/build2us-apidocs/img/image1.png\" width=\"700\"     alt=\"Configuring a myallocator property for use with your channel\"     title=\"Configuring a myallocator property for use with your channel\" /></p> <p>Setting up your OTA on myallocator from the hotel's perspective:</p> <ol> <li>Hotel selects your OTA from list of channels on myallocator, enters hotel ID or username, and password and this is passed in <code>SetupProperty</code>. This verifies that the credentials given are correct.</li> <li>Myallocator sends <code>GetRooms</code> and receives a list of rooms configured on the OTA, hotel performs room mapping of myallocator room types to your OTA's room types.</li> <li>If you support rate plans, myallocator will also send a <code>GetRatePlans</code> API request to include in the mapping process.</li> <li>Hotel finalizes by performing a full refresh of all data to OTA.</li> </ol>",
    "filename": "./build2us.pm",
    "groupTitle": "Getting_Started"
  },
  {
    "group": "Getting_Started",
    "type": "",
    "url": "/",
    "title": "Step 3: Integrate SDK",
    "name": "Step_3__Integrate_SDK",
    "version": "201707.0.1",
    "description": "<p><img src=\"/build2us-apidocs/img/image2.png\" width=\"700\"     alt=\"API requests flow\"     title=\"API requests flow\" /></p> <p>Hotel daily flow</p> <ol> <li><code>ARIUpdate</code>s are sent to OTA whenever the availability, rates or restrictions changed, or automatically updated due to an incoming booking. A full refresh may be sent at any time.</li> <li>Periodic calls to <code>GetBookingList</code>, depending on how this is configured for your OTA.</li> <li><code>GetBookingId</code> is called for each <code>BookingId</code></li> <li>Proceed to Booking Received Flow</li> </ol> <p>OTA booking notification (optional, but highly recommended)</p> <ol> <li>New Booking arrives for property, notify myallocator via OTA API</li> <li>Myallocator will call <code>GetBookingId</code> and download Booking</li> <li>Proceed to Booking Received Flow</li> </ol> <p>Booking Received Flow</p> <ol> <li>Myallocator adjusts availability for the booking</li> <li>Myallocator sends the booking to the property's PMS (if connected)</li> <li><code>ARIUpdate</code> of new availability to all connected OTAs, including the OTA that generated the booking/modification/cancellation.</li> </ol>",
    "filename": "./build2us.pm",
    "groupTitle": "Getting_Started"
  },
  {
    "group": "Getting_Started",
    "type": "POST|GET",
    "url": "/callback/ota/{cid}/v201503/NotifyBooking?ota_property_id={ota_property_id}&booking_id={booking_id}",
    "title": "Step 4: NotifyBooking",
    "name": "Step_4__NotifyBooking",
    "version": "201707.0.1",
    "description": "<p>Requests myallocator to immediately request a booking based on the <code>ota_property_id</code> and the passed <code>booking_id</code>. This should be fired/hit on any new booking OR any changes such as cancellations to an existing booking.</p> <p>It is acceptable to fire this for all bookings - even for properties which are connected to other channel managers.</p>",
    "filename": "./build2us.pm",
    "groupTitle": "Getting_Started"
  },
  {
    "group": "Overview",
    "type": "",
    "url": "/",
    "title": "",
    "name": "Overview",
    "version": "201707.0.1",
    "description": "<p>This API allows a OTA (&quot;Online Travel Agency&quot;, also called &quot;channel&quot;, or &quot;travel booking website&quot;) to integrate with the myallocator channel manager by implementing a API receiver in their environment.</p> <p>The API integration may be developed in any language, however, we have provided a PHP SDK library and receiver that you may drop into your PHP environment to speed up integration. The PHP SDK may be found <a href=\"https://github.com/MyAllocator/myallocator-ota-php\">here</a>.</p> <p>It's as simple as:</p> <p><img src=\"/build2us-apidocs/img/image3.png\" width=\"700\"     alt=\"Flowchart of connecting myallocator with your OTA\"     title=\"Flowchart of connecting myallocator with your OTA\" /></p>",
    "filename": "./build2us.pm",
    "groupTitle": "Overview"
  },
  {
    "group": "SDK_Reference",
    "type": "POST",
    "url": "/",
    "title": "ARIUpdate",
    "name": "ARIUpdate",
    "version": "201707.0.1",
    "examples": [
      {
        "title": "Request",
        "content": "{\n    \"verb\":\"ARIUpdate\",\n    \"ota_property_id\": \"CID_123\",\n    \"ota_property_password\" : \"very:secret-password\",\n    \"mya_property_id\" : \"25678\",\n    \"guid\" : \"\",\n    \"currency\" : \"USD\",\n    \"ota_cid\" : \"\",\n    \"shared_secret\" : \"\",\n    \"Inventory\" : [\n        {\n            \"ota_room_id\" : \"61365\",     // always passed\n            \"ota_rate_id\" : \"rate_456\",  // only if rate plans are supported\n            \"start_date\" : \"2018-01-22\", // always passed\n            \"end_date\" : \"2018-02-12\",   // always passed\n            \"units\" : 5,                 // conditionally passed\n            \"rate\" : \"15.00\",            // conditionally passed\n            \"rdef_single\" : \"2.00\",      // conditionally passed, single use rate\n            \"max_los\" : 14,              // *only if ota capable\n            \"min_los\" : 2,               // *only if ota capable\n            \"closearr\" : false,          // *only if ota capable\n            \"closedep\": false,           // *only if ota capable\n            \"close\" : false              // *only if ota capable\n        },\n        {\n            \"ota_room_id\" : \"61365\",\n            \"ota_rate_id\" : \"rate_456\",\n            \"start_date\" : \"2018-02-13\"\n            \"end_date\" : \"2018-02-14\",\n            \"units\" : 0,\n            \"rate\" : \"309.00\",\n            \"max_los\" : 14,              // max length of stay\n            \"min_los\" : 2,               // min length of stay\n            \"closearr\": false,           // do not allow arrivals in this range\n            \"closedep\": false,           // do not allow departures in this range\n            \"close\": false               // do not allow bookings\n        }\n    ]\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n    \"success\":true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (invalid credentials)",
          "content": "{\n    \"success\":false,\n    \"errors\": [\n        {\n            \"id\": \"1001\",\n            \"msg\": \"The login details you provided are incorrect. Please update your channel details.\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>This call is used to send availability, rates and restrictions to your OTA. We will combine the updates into as few date ranges as possible, and we split bigger updates into several API requests.</p> <p>If you have been enabled for rate plan support then <code>ota_rate_id</code> will contain your rate plan ID. Note that myallocator only supports availability on the room level, so for the same <code>ota_room_id</code> and the same date range the availability will always be the same. Only restrictions and rates are sent on the rate plan level.</p> <p><code>units</code> refers to the number or rooms bookable (available) for private rooms, or for the number of beds for shared/dorm rooms.</p> <p><code>rate</code> refers to the price per unit. <code>rdef_single</code> is the single use rate, if only one person is staying. This will only be present for private rooms, and only if the occupancy of this room is higher than 1. If the value is 0 we recommend to not make the single use rate available, or to just use the same price as in <code>rate</code>.</p>",
    "filename": "./build2us.pm",
    "groupTitle": "SDK_Reference"
  },
  {
    "group": "SDK_Reference",
    "type": "POST",
    "url": "/",
    "title": "CancelBooking",
    "name": "CancelBooking",
    "version": "201707.0.1",
    "examples": [
      {
        "title": "Request",
        "content": "{\n    \"verb\":\"CancelBooking\",\n    \"ota_property_id\": \"CID_123\",\n    \"mya_property_id\":\"\",\n    \"shared_secret\":\"\",\n    \"booking_id\":\"\",\n    \"reason\":\"\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n    \"success\":true,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n    \"success\":false,\n    \"errors\":[\n        { \"id\":\"4002\", \"msg\":\"Booking is already canceled\" }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Allows a property to cancel a booking on your system from the myallocator side.</p> <p>IMPORTANT: Please contact us to enable this capability for your channel. It is NOT enabled by default.</p> <p>The reason why the booking is to be canceled is given in the <code>reason</code> field. If the booking cannot be canceled the error code should be provided. Here are possible error codes</p> <ul> <li>4001 - booking has already departed</li> <li>4002 - booking is already canceled</li> <li>4003 - booking cannot be canceled. The reason is provided in the <code>msg</code> field.</li> </ul>",
    "filename": "./build2us.pm",
    "groupTitle": "SDK_Reference"
  },
  {
    "group": "SDK_Reference",
    "type": "POST",
    "url": "/",
    "title": "CreateProperty",
    "name": "CreateProperty",
    "version": "201707.0.1",
    "examples": [
      {
        "title": "Request",
        "content": "{\n    \"mya_property_id\" : \"12345\",\n    \"ota_cid\" : \"your_cid\",\n    \"verb\" : \"CreateProperty\",\n    \"shared_secret\" : \"****\",\n    \"guid\" : \"...\",\n\n    \"ota_property_id\" : \"\",               // For this call always empty\n    \"ota_property_password\" : \"\",         // For this call always empty\n\n    \"Property\" : {\n        \"name\" : \"Sample Hostel\",\n        \"country\" : \"US\",\n        \"currency\" : \"EUR\",\n        \"email_default\" : \"someone@example.com\",\n        \"email_channel_booking\" : \"bookings@example.com\",\n        \"default_min_los\" : 3,\n        \"default_max_los\" : 0,   // 0 means no max_los restriction\n        \"breakfast\" : \"\",        //  = Not available, IN = Included in price, EX = Excluded from price\n        \"weekend\" : [\n            \"tuesday\",\n            \"saturday\",\n            \"sunday\"\n        ],\n\n        \"firstname\" : \"John\",\n        \"lastname\"  : \"Smith\",\n        \"timezone\" : \"Asia/Thimphu\",\n\n        \"address\" : {\n            \"address_line_1\" : \"Main St\",\n            \"address_line_2\" : \"Annex\",\n            \"city\" : \"San Diego\",\n            \"zip\" : \"92120\",\n            \"state\" : \"CA\",\n            \"country\" : \"US\",\n            \"website\" : \"http://example.com\",\n            \"lon\" : \"32.715736\",\n            \"lat\" : \"-117.161087\",\n            \"phone\" : \"+1 123123123 \",\n            \"fax\" : \"+1 123123123\"\n        },\n\n        \"business_contact\": {\n            \"main_contact_name\": \"Jeff Johnson\",\n            \"company_name\": \"Hostels Inc.\",\n            \"account_manager_name\": \"Hillary Jackson\",\n            \"vat_id\": \"US2345678\",\n            \"address_line_1\": \"Office Street\",\n            \"address_line_2\": \"3rd floor\",\n            \"state\": \"Office State\",\n            \"zip\": \"22222\",\n            \"city\": \"Office City\",\n            \"country\": \"DE\"\n        },\n\n        \"images\" : [\n            {\n                \"url\": \"https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c37.jpg\",\n                \"description\": \"Outside View\",\n                \"sort_order\": 1\n            },\n            {\n                \"url\": \"https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c38.jpg\",\n                \"description\": \"Reception Area\",\n                \"sort_order\": 2\n            }\n        ],\n\n        \"rooms\" : [\n            {\n                \"mya_room_id\" : 45829,\n                \"units\" : 5,                // Number of rooms for this type\n                \"beds\" : 2,               // Max. number of beds in that room\n                \"dormitory\" : false,\n                \"label\" : \"Double Room\",\n                \"description\" : \"A potentially long description about the room\",\n                \"images\" : [\n                    {\n                        \"url\": \"https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c37.jpg\",\n                        \"description\": \"Double bed\",\n                        \"sort_order\": 1\n                    },\n                    {\n                        \"url\": \"https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c38.jpg\",\n                        \"description\": \"Bath room\",\n                        \"sort_order\": 2\n                    },\n                    {\n                        \"url\": \"https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c99.jpg\",\n                        \"description\": \"Balcony\",\n                        \"sort_order\": 3\n                    }\n                ],\n                \"rateplans\" : [\n                   {\n                      \"mya_rate_id\" : 0,\n                      \"label_public\" : \"Default Rate Plan\",\n                      \"label_private\" : \"Default Rate Plan\"\n                   },\n                   {\n                      \"label_public\" : \"Non-refundable\",\n                      \"label_private\" : \"NR\",\n                      \"mya_rate_id\" : 850\n                   },\n                   {\n                      \"label_public\" : \"With Breakfast\",\n                      \"label_private\" : \"BR\",\n                      \"mya_rate_id\" : 851\n                   }\n                ]\n            },\n            {\n                \"mya_room_id\" : 290,\n                \"units\" : 25,\n                \"beds\" : \"4\",\n                \"dormitory\" : false,\n                \"label\" : \"4-person private\",\n                \"description\" : null,\n                \"images\" : [],\n                \"rateplans\" : [\n                   {\n                      \"label_private\" : \"Default Rate Plan\",\n                      \"label_public\" : \"Default Rate Plan\",\n                      \"mya_rate_id\" : 0\n                   }\n                ]\n            },\n            {\n                \"mya_room_id\" : 329,\n                \"units\" : 7,\n                \"beds\" : \"3\",\n                \"dormitory\" : false,\n                \"label\" : \"3-person private\",\n                \"description\" : \"Best three bed room in town\",\n                \"images\" : [\n                    {\n                        \"url\": \"https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c37.jpg\",\n                        \"description\": \"3-bed room\",\n                        \"sort_order\": 1\n                    }\n                ],\n                \"rateplans\" : [\n                   {\n                      \"label_public\" : \"Default Rate Plan\",\n                      \"label_private\" : \"Default Rate Plan\",\n                      \"mya_rate_id\" : 0\n                   },\n                   {\n                      \"mya_rate_id\" : 853,\n                      \"label_private\" : \"NR\",\n                      \"label_public\" : \"Non-refundable\"\n                   }\n                ]\n            },\n            {\n                \"mya_room_id\" : 52,\n                \"units\" : 3,\n                \"beds\" : \"30\",\n                \"dormitory\" : true,\n                \"gender\" : \"MIXED\",             // Can be MIXED, FEMALE, MALE\n                \"label\" : \"30-person mixed shared\",\n                \"description\" : null,\n                \"images\" : [],\n                \"rateplans\" : [\n                   {\n                      \"mya_rate_id\" : 0,\n                      \"label_public\" : \"Default Rate Plan\",\n                      \"label_private\" : \"Default Rate Plan\"\n                   },\n                   {\n                      \"mya_rate_id\" : 852,\n                      \"label_public\" : \"Non-refundable\",\n                      \"label_private\" : \"NR\"\n                   }\n                ]\n            }\n        ]\n    }\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n    \"success\": true,\n    \"ota_property_id\": \"CID_123\",                              // Your (new) property ID\n    \"ota_property_password\": \"secret_password\",                // Optional additional parameter to allow connection\n    \"instruction_text\": \"It worked!\\n\\nNow click the link.\",   // Optional instructions\n    \"instruction_link\": \"http://ota.com/instructions\",         // Optional link to be displayed below instruction text\n\n    \"room_mappings\": [                    // Automatic room/rate plan mapping\n        {\n            \"ota_room_id\" : \"11111\",      // Your (new) room ID\n            \"mya_room_id\" : 45829,        // Myallocator room ID\n            \"ota_rate_id\" : \"rp6623\",     // Your (new) rate plan ID\n            \"mya_rate_id\" : 0             // Myallocator rate plan ID, always 0 for default rate plan\n        },\n        {\n            \"ota_room_id\" : \"11111\",\n            \"mya_room_id\" : 45829,\n            \"ota_rate_id\" : \"rp6624\",\n            \"mya_rate_id\" : 850\n        },\n        {\n            \"ota_room_id\" : \"11111\",\n            \"mya_room_id\" : 45829,\n            \"ota_rate_id\" : \"rp6624\",\n            \"mya_rate_id\" : 851\n        },\n        {\n            \"ota_room_id\" : \"22222\",\n            \"mya_room_id\" : 290,\n            \"ota_rate_id\" : \"rp6625\",\n            \"mya_rate_id\" : 0\n        },\n        {\n            \"ota_room_id\" : \"22222\",\n            \"mya_room_id\" : 290,\n            \"ota_rate_id\" : \"rp6626\",\n            \"mya_rate_id\" : 853\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Can be used to create a new property (including rooms) on your OTA based on the details that we have in myallocator (eg. property name, address, images, room details, etc). This call needs to be activated explicitly from our side before you can use it. Please talk to your myallocator contact before implementing this call!</p> <p>Rate plan information was added at a later date and is only transmitted for new build-to-us implementations or if the feature has been enabled explicitly. Note that every room has a default rate plan, and the ID (even across different rooms) is always <code>0</code>.</p> <p>Once approved please provide us with your terms &amp; conditions for us to display to a property. You should provide them as a HTML file with only basic styling.</p> <p>We cannot guarantee that all of the following request fields will really be filled in.</p> <p>You need to return <code>room_mappings</code> to make the automatic full refresh work after successful property creation. If you do not support rate plans you do not need to return <code>ota_rate_id</code> and <code>mya_rate_id</code>.</p> <p>The <strong>instruction text</strong> (<code>instruction_text</code>) will be displayed to the hotel after the property creation is complete. We will escape any HTML characters, so please only return plain text. You can include linebreaks (\\n) which will be converted into actual line breaks for HTML display.</p> <p>If an <strong>instruction link</strong> (<code>instruction_link</code>) is provided we will display the clickable link below the instruction text (if present).</p>",
    "filename": "./build2us.pm",
    "groupTitle": "SDK_Reference"
  },
  {
    "group": "SDK_Reference",
    "type": "POST",
    "url": "/",
    "title": "GetBookingId",
    "name": "GetBookingId",
    "version": "201707.0.1",
    "examples": [
      {
        "title": "Request",
        "content": "{\n    \"verb\":\"GetBookingId\",\n    \"ota_property_id\": \"CID_123\",\n    \"mya_property_id\":\"\",\n    \"guid\":\"\",\n    \"shared_secret\":\"\",\n    \"booking_id\":\"123456789\",\n    \"version\":\"\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Minimal Booking Example",
          "content": "{\n    // Any orange text is a JSON Boolean value, NOT a string value.\n    // Do not surround these field values in double quotes.\n    \"success\": true,\n    \"booking_id\": \"123456789\", // should be same as OrderId\n    \"ota_property_id\": \"CID_123\",\n    \"ota_property_sub_id\": \"\", // Required only if your channel uses the\n                               // GetSubProperties method. This field must be\n                               // set to the unique channel property identifier.\n    \"mya_property_id\": \"\",\n\n    \"Booking\": {\n        \"OrderId\": \"123456789\",\n        \"OrderDate\": \"2018-04-22\",\n        \"OrderTime\": \"18:02:58\",\n        \"IsCancellation\": false,\n        \"TotalCurrency\": \"USD\",\n        \"TotalPrice\": 134,\n\n        \"Customers\": [\n            {\n                \"CustomerCountry\": \"US\",\n                \"CustomerEmail\": \"test@test.com\",\n                \"CustomerFName\": \"Test Firstname\",\n                \"CustomerLName\": \"Test Lastname\"\n            }\n        ],\n\n        \"Rooms\": [\n            {\n                \"ChannelRoomType\": \"abcdef\", // This is the room identifier on your channel\n                \"Currency\": \"USD\",\n                \"DayRates\": [\n                    {\n                        \"Date\": \"2017-11-08\",\n                        \"Description\": \"Refundable Rate\",\n                        \"Rate\": 32.5,\n                        \"Currency\": \"USD\",\n                        \"RateId\": \"13649\"\n                    },\n                    {\n                        \"Date\": \"2017-11-09\",\n                        \"Description\": \"Refundable Rate\",\n                        \"Rate\": 34.5,\n                        \"Currency\": \"USD\",\n                        \"RateId\": \"13649\"\n                    }\n                ],\n                \"StartDate\": \"2017-11-08\",\n                \"EndDate\": \"2017-11-09\", // Set equal to last full day of stay\n                                         // (departure date minus 1)\n                                         // In this example, the booking is for two nights\n                \"Price\": 134,\n                \"Units\": 2\n            }\n        ],\n\t\"Payments\": [] // Include this field only if supplying payment data.\n                       // Please see BookingCreate section below for required fields.\n    }\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>The booking format is described <a href=\"https://github.com/MyAllocator/build2us-apidocs/blob/gh-pages/booking_format_b2u.md\">here in full detail</a>.</p> <p>We also have a page with <a href=\"https://github.com/MyAllocator/bookingsamples\">Booking Examples</a> from different channels.</p> <p><strong>IMPORTANT</strong>: The github BookingSamples link above is intended for a PMS integrating into myallocator. As an OTA there are a few key differences in the format.  OTA Bookings should <em>NEVER</em> include <code>RoomTypeIds:[]</code> node, instead pass <code>&quot;ChannelRoomType&quot;:&quot;123&quot;</code>.  Do not attempt to pass <code>channel</code>, or any field labelled starting with <code>MyAllocator*</code> or <code>myallocator_*</code> (all those will be setup automatically).</p> <p>Most fields are optional. The minimal booking example below lists which fields are required for a Build-to-us integration.</p> <p>Prices: Send us sell rates (rates including taxes and fees). The sum of all room prices should equal the TotalPrice field. Day rates should be per unit, so the sum of all day rates multiplied by the number of units should equal the room price.</p> <p>Country codes: For CustomerCountry and CustomerNationality (if you include those fields) make sure to pass the country code as uppercase Alpha-2 ISO-3166 codes.</p> <p>Currency codes: Make sure they are valid ISO-4217 (uppercase).</p> <p>Make sure to provide <code>OrderDate</code> and <code>OrderTime</code>. Tell us which timezone the date and time is in before the certification. We recommend UTC.</p> <p>Implementation suggestions: when testing make sure the myallocator test property has &quot;download bookings&quot; enabled or the booking will be saved in a queue and not visible during testing.  To enable login and go to MANAGE / General Details / Download new bookings from channels. Default setting is &quot;Off&quot;. Once enabled please allow 30 minutes for the backend to start processing bookings. Also there may be a normal 1-2 minute period after a <code>GetBookingId</code> response before the booking is visible in the inbox.myallocator.com interface (the bookings are held in a temporary queue on our backend).</p> <p>For testing please use: <code>*http://api.myallocator.com/callback/ota/{CID}/v201503/NotifyBooking?ota_property_id={OTA_PID}&amp;booking_id={OTA_ID}</code></p>",
    "filename": "./build2us.pm",
    "groupTitle": "SDK_Reference"
  },
  {
    "group": "SDK_Reference",
    "type": "POST",
    "url": "/",
    "title": "GetBookingList",
    "name": "GetBookingList",
    "version": "201707.0.1",
    "examples": [
      {
        "title": "Request",
        "content": "{\n    \"verb\":\"GetBookingList\",\n    \"ota_property_id\": \"CID_123\",\n    \"mya_property_id\":\"\",\n    \"guid\":\"\",\n    \"shared_secret\":\"\",\n    \"ota_booking_version\":\"2017-06-22 12:09:19\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n    \"success\":true,\n    \"Bookings\":[\n    { \"booking_id\":\"###\", \"version\":\"optional\" },\n    { \"booking_id\":\"###\", \"version\":\"optional\" },\n    { \"booking_id\":\"###\", \"version\":\"optional\" },\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Should returns a list of bookings/reservations which have not been acknowledged or modified.</p> <p>With each request we send along <code>ota_booking_version</code>, which has the format <code>YYYY-MM-DD HH:MM:SS</code> and indicates the time in UTC we last successfully requested bookings. It can be undefined if no successful response has been received so far. Please use <code>ota_booking_version</code> to only return to us new or modified bookings made since then. To ensure that no booking is skipped due to a time-offset between your and our server make sure to always reduce 5 or more minutes from the time given. Example: we provide 2017-06-22 12:09:19, then please return all new/modified/cancalled bookings since 2017-06-22 12:04:19 (5 minutes before the time sent).</p> <p>If <code>ota_booking_version</code> is undefined/empty please return all bookings.</p>",
    "filename": "./build2us.pm",
    "groupTitle": "SDK_Reference"
  },
  {
    "group": "SDK_Reference",
    "type": "POST",
    "url": "/",
    "title": "GetRatePlans",
    "name": "GetRatePlans",
    "version": "201707.0.1",
    "description": "<p>If your channel supports different rates per room and <strong>if we enabled the OTA</strong> for rate plan support, we'll make a <code>GetRatePlans</code> call to the OTA to retrieve which rate plans you have configured for the passed credentials.</p> <p>If a rate plan is tied to a specific room ID (on your channel), then set this room ID in <code>ota_room_id</code>. If a rate plan is applicable for all rooms, set <code>ota_room_id</code> to 0.</p>",
    "examples": [
      {
        "title": "Request",
        "content": "{\n    \"verb\": \"GetRatePlans\",\n    \"ota_property_id\": \"CID_123\",\n    \"mya_property_id\": \"\",\n    \"guid\": \"\",\n    \"shared_secret\": \"\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n    \"success\": true,\n    \"RatePlans\": [\n        { \"ota_room_id\":\"\", \"ota_rateplan_id\":\"xxx\", \"title\":\"Default rate\" },\n        { \"ota_room_id\":\"\", \"ota_rateplan_id\":\"xxx\", \"title\":\"Non-refundable rate\" }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./build2us.pm",
    "groupTitle": "SDK_Reference"
  },
  {
    "group": "SDK_Reference",
    "type": "POST",
    "url": "/",
    "title": "GetRoomTypes (required)",
    "name": "GetRoomTypes__required_",
    "version": "201707.0.1",
    "examples": [
      {
        "title": "Request",
        "content": "{\n    \"verb\":\"GetRoomTypes\",\n    \"ota_property_id\": \"CID_123\",\n    \"mya_property_id\":\"\",\n    \"guid\":\"\",\n    \"shared_secret\":\"\",\n    \"RoomInfo\":[ .. ]           // conditional, see RoomInfo Appendix\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n    \"success\":true,\n    \"Rooms\":[\n        { \"ota_room_id\":\"RoomIdOnOTA1\", \"title\":\"\", \"occupancy\":##, \"detail\":\"\", \"dorm\":true },\n        { \"ota_room_id\":\"RoomIdOnOTA2\", \"title\":\"\", \"occupancy\":##, \"detail\":\"\", \"dorm\":false },\n        { \"ota_room_id\":\"RoomIdOnOTA3\", \"title\":\"\", \"occupancy\":##, \"detail\":\"\", \"dorm\":true }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Should return a list of rooms configured for the passed credentials.</p> <p>Notes: occupancy should be the maximum number of people who can fit in the room. <code>dorm</code> indicates that the room is shared with other guests.</p>",
    "filename": "./build2us.pm",
    "groupTitle": "SDK_Reference"
  },
  {
    "group": "SDK_Reference",
    "type": "POST",
    "url": "/",
    "title": "GetSubProperties",
    "name": "GetSubProperties",
    "version": "201707.0.1",
    "examples": [
      {
        "title": "Request",
        "content": "{\n    \"verb\":\"GetSubProperties\"\n    \"mya_property_id\":\"\",\n    \"ota_property_id\": \"CID_123\",\n    \"shared_secret\":\"\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n    \"success\":true,\n    \"SubProperties\":[\n        { \"ota_property_sub_id\": \"\", \"title\":\"\" },\n        { \"ota_property_sub_id\": \"\", \"title\":\"\" },\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Some OTAs only tie one property to a specific login username/password where the username is also the <code>ota_property_id</code>. Others allow for one username/password to be associate with multiple properties. In this second case, each OTA property identifier is stored as an <code>ota_property_sub_id</code> in order to be handled separately from the hotel's OTA username. This method call should return all of the properties (<code>ota_property_sub_id</code>s) associated with the hotel's username/password so that the correct <code>ota_property_sub_id</code> can be linked with our <code>mya_property_id</code> for a specific property.</p> <p><strong>IMPORTANT</strong>: Please contact us to enable this capability for your OTA. It is NOT enabled by default. It is only necessary if your OTA allows for multiple properties associated with one login username/password.</p> <p>Implementation suggestions: <code>ota_property_sub_id</code> will be the OTA identifier for a specific property managed by the hotel while the title is that property's name. This method will allow the hotel to map their myallocator property with the OTA's <code>ota_property_sub_id</code> when setting up the property-OTA association on myallocator.</p>",
    "filename": "./build2us.pm",
    "groupTitle": "SDK_Reference"
  },
  {
    "group": "SDK_Reference",
    "type": "POST",
    "url": "/",
    "title": "HealthCheck",
    "name": "HealthCheck",
    "version": "201707.0.1",
    "examples": [
      {
        "title": "Request",
        "content": "{\n    \"verb\":\"HealthCheck\"\n    \"mya_property_id\":\"\",       // note: will be blank on healthcheck\n    \"ota_property_id\":\"\",       // note: will be blank on healthcheck\n    \"shared_secret\":\"\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n    \"success\":true|false\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Purpose: Pinged prior to SetupProperty or other configuration requests to verify proper operation. Should always return true.</p>",
    "filename": "./build2us.pm",
    "groupTitle": "SDK_Reference"
  },
  {
    "group": "SDK_Reference",
    "type": "POST",
    "url": "/",
    "title": "SetupProperty (required)",
    "name": "SetupProperty__required_",
    "version": "201707.0.1",
    "examples": [
      {
        "title": "Request",
        "content": "{\n    \"verb\":\"SetupProperty\",\n    \"mya_property_id\":\"\",\n    \"ota_property_id\": \"CID_123\",\n    \"ota_property_password\":\"\",\n    \"guid\":\"\",\n    \"shared_secret\":\"\",\n    \"RoomInfo\":[ .. ]           // conditional, see RoomInfo Appendix\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n    \"success\":true,\n    \"ota_property_id\": \"CID_123\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>On the myallocator.com interface the hotel will go to the OTA setup by selecting the icon. There the user will be prompted to put in the credentials (<code>ota_property_id</code> and <code>ota_property_password</code>), which is provided by your OTA. Both <code>ota_property_id</code> and <code>ota_property_password</code> will be retained by us and passed in every call. Should you not need two identification fields please let us know and we can set it to only ask for <code>ota_property_id</code>. However, this would mean that some kind of activation process is required where our customer support team enters the ID on behalf of the hotel. Otherwise it would be possible for the hotel to enter someone else's credentials.</p> <p>Implementation suggestions: <code>ota_property_id</code> should typically be a username or hotel ID on your OTA. The <code>ota_property_password</code> is typically a password used by the hotel to access your OTA's extranet.</p>",
    "filename": "./build2us.pm",
    "groupTitle": "SDK_Reference"
  }
] });
