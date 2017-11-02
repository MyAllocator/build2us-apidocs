define({ "api": [
  {
    "group": "Appendix",
    "type": "",
    "url": "/",
    "title": "Returning Messages/Error(s)",
    "name": "Returning_Messages_Error_s_",
    "version": "201707.0.1",
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"success\":\"true|false\", \n    \"errors\": [\n        { \"id\":\"\", \"type\":\"\", \"msgid\":\"XXX\", \"msg\":\"\" },\n        { \"id\":\"\", \"type\":\"\", \"msgid\":\"XXX\", \"msg\":\"\" }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>msgtypes:</p> <ul> <li>warning: will only display if the call is successful.  All other types are considered fatal errors.</li> <li>ise : an unknown error occurred in OTA server infrastructure -- retry will occur, you will be notified.</li> <li>api : OTA detected misformatted request / invalid data -- retry will occur.</li> <li>user    : user data mapping inconsistency (this will NOT trigger an error notification to you) -- retry will most likely not occur (varies by data type).</li> </ul> <p>Multiple errors should only be returned calls such as ARIUpdate where multiple-unrelated errors can occur. Most other calls will display either the first or last error message returned.</p> <p>The generic ota error handler accepts two &quot;high level&quot; approaches to error handling, the first is to use your codes and messages (id + msg), the second is to use ours (msgid).</p> <p>If msgid is used, then you will need to obtain the list of msgid's and map your internal error responses to our codes, this has the advantage of being able to be internationalized for clients, and also linking to relevant knowledge base articles.  If we don't have suitable matching error in our list of codes we are happy to add them for you.  Here is a short table of common msgid's</p> <table> <thead> <tr> <th>msgid</th> <th>explanation</th> </tr> </thead> <tbody> <tr> <td>FAULT.OTA.LOGIN</td> <td>The credentials provided by you for the ota are invalid.</td> </tr> <tr> <td>FAULT.OTA.LOGIN.DISABLED</td> <td>The account credentials are valid, but the login has been disabled or is not activated for this interface</td> </tr> <tr> <td>FAULT.OTA.ROOM.MINRATE</td> <td>the rate is too low and was not updated.</td> </tr> </tbody> </table> <p>Please refer to the <a href=\"https://github.com/MyAllocator/myallocator-error-codes/blob/master/Errors.md\">following document</a> for a full list of error codes generated and handled by myallocator.</p> <p>If a msgid is returned then the json &quot;success&quot;:&quot;true|false&quot; is ignored and the msgid is considered authoritative on the state of the request (this is because msgid's can have more subtle status's like partial success which cannot be represented by a simple boolean state)</p> <p>If msgid is not included, or is not valid then the boolean &quot;success&quot;:&quot;true|false&quot; + the id and msg will be used.  If success is true then all errors will be treated as warnings, and if success is false then all errors will be treated as fatal errors.  The msgid 's will be generated under the cid namespace for the ota as follows:</p> <p>(success = false) FAULT.OTA.cid.id  : msg</p> <p>(success = true) WARNING.OTA.cid.id : msg</p> <p>If you plan to submit errors to us for internationalization then you can also include the corresponding msgid for your business logic.</p> <p>msgs can also contain variables, this is particularly handy for situations where room id's should be displayed.  To do this simply include the variable in the msgtxt -- ex: %room_id%  %room_desc%  ---</p> <p>{ msg:&quot;sorry but %room_desc% #%room_id% is not valid&quot;, room_desc:&quot;2 bedroom dorm&quot;, room_id:&quot;123&quot; }</p> <p>This approach can also be used with existing myallocator msgid's which have variables, making it possible to internationalize error responses while still mapping to fixed error codes.</p> <p>HTTP Status code <a href=\"https://github.com/for-GET/know-your-http-well/blob/master/status-codes.md\">reference</a>.</p>",
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
      "examples": [
        {
          "title": "Room Info example",
          "content": "{\n    \"RoomInfo\" : [\n        { \"mya_room_id\":\"\", \"ota_room_id\":\"\", \"label\":\"Single Room\", \"beds\":1, \"units\":10, \"dormitory\":false, \"Images\":[ \"http://path.to/image1.png\", \"http://path.to/image2.png\" ]},\n        { \"mya_room_id\":\"\", \"ota_room_id\":\"\", \"label\":\"Double Room\", \"beds\":2, \"units\":10, \"dormitory\":false, \"Images\":[ \"http://path.to/image1.png\", \"http://path.to/image2.png\" ]},\n        { \"mya_room_id\":\"\", \"ota_room_id\":\"\", \"label\":\"6 Bed CO-ED Dormitory\", \"beds\":6, \"units\":1, \"dormitory\":false, \"gender\":\"MIXED\", \"Images\":[ \"http://path.to/image1.png\", \"http://path.to/image2.png\" ]},\n        { \"mya_room_id\":\"\", \"ota_room_id\":\"\", \"label\":\"4 Bed FEMALE Dormitory\", \"beds\":4, \"units\":1, \"dormitory\":false, \"gender\":\"FEMALE\", \"Images\":[ \"http://path.to/image1.png\", \"http://path.to/image2.png\" ]},\n        { \"mya_room_id\":\"\", \"ota_room_id\":\"\", \"label\":\"4 Bed MALE Dormitory\", \"beds\":6, \"units\":1, \"dormitory\":false, \"gender\":\"MALE\", \"Images\":[ \"http://path.to/image1.png\", \"http://path.to/image2.png\" ]}\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>RoomInfo (if specified in OTA definition) is conditionally returned in the SetupProperty and GetRoomTypes call, and can also be accessed via the RoomInfo Callback.<br> To save bandwidth RoomInfo is only returned in SetupProperty/GetRoomTypes if it is explicitly enabled in the OTA configuration on MyAllocator.  The RoomInfo callback is always available.<br> RoomInfo is only necessary for deep integrations or situations where the OTA plans to automatically/create destroy rooms using MyAllocator configuration.</p> <p><em>Implementation Suggestion:</em> If you are an OTA planning to use MyAllocator RoomId's (mya_room_id) instead of your own ota_room_id's please let us know and we'll set the ota_room_id automatically.  Then we can also eliminate the Room Mapping step from the properties ota configuration.</p>",
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
    "description": "<p>Json is a typeless language, by convention any associative array (hash) key which begins with an Uppercase First Letter will return an array of hashes. (These are not typos, they are intentional)</p> <p>HTTP response codes should always be 200, with a content-type application/json, gzip compression and keepalives will be used if supported.</p>",
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
    "description": "<table> <thead> <tr> <th> </th> <th> </th> </tr> </thead> <tbody> <tr> <td>ota</td> <td>online travel agency (ex: booking.com, or competitor)</td> </tr> <tr> <td>cid</td> <td>Channel ID - a four digit code used by myallocator uniquely identify a OTA.</td> </tr> <tr> <td>verb</td> <td>the action being performed. HealthCheck, SetupProperty, GetRoomTypes, GetBookingList, GetBookingId, SetAvailability</td> </tr> <tr> <td>mya_property_id</td> <td>the myallocator property id (included for debugging requests and support tickets)</td> </tr> <tr> <td>ota_property_id</td> <td>the property id on the ota</td> </tr> <tr> <td>guid</td> <td>a unique 36 character code which identifies a request. for highest security an ota should only accept/process a guid once (to avoid replay attacks).  useful for seeing if a request is a retry.   this is mostly used to introduce entropy into the request.</td> </tr> <tr> <td>shared_secret</td> <td>a shared secret between the OTA and MyAllocator.</td> </tr> <tr> <td>booking_id</td> <td>the booking id on the ota of a particular reservation</td> </tr> </tbody> </table> <p><strong>HTTPS Request:</strong> json payload will be transmitted in a json form parameter via form-data, and with Content-Type of &quot;application/json&quot; json response should be of type &quot;application/json&quot;</p>",
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
            "description": "<p>property_id</p>"
          }
        ]
      }
    },
    "description": "<p>This is for technical support on the remote OTA to enqueue a full refresh of the property.</p>",
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
            "description": "<p>property_id</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "booking_json",
            "description": "<p>see booking samples</p>"
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
          "content": "{\n        \"myallocator_id\":\"12345\",   \n        \"success\":true\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p><strong>IMPORTANT:</strong> please record the myallocator_id for your records. If you implement BookingCreate you must also implement retry logic.  Please do not retry more than once per minute. Additionally the system will lock (block) multiple concurrent requests for the same property.</p>",
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
            "description": "<p>property_id</p>"
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
          "content": "{\n        \"RoomInfo:[ .. ] // see RoomInfo Appendix\n}",
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
    "title": "Step 1",
    "name": "Step_1",
    "version": "201707.0.1",
    "description": "<ul> <li>Setup a FREE trial account at inbox.myallocator.com</li> <li>Send an email to devhelp@myallocator.com and introduce yourself. Include the following details: <ul> <li>Your Domain Name/URL</li> <li>API Receiver URL (the script on your servers which will receive requests from MyAllocator) -- this can be a development machine/test environment.</li> <li>Attach a 36x36 Icon (for our user interface)</li> <li>Signup/Registration URL for clients:</li> <li>Special signup instructions: (will be displayed in our interface, and should help the hotel understand how to obtain setup credentials).</li> <li>Administrative Contact (Name, Email, Phone, Skype, etc.)</li> <li>Technical/Developer Contact</li> <li>update_years: how many years in the future can availability be uploaded</li> <li>Core Features: <ul> <li>Minimum Length of Stay  [Y/N]  (# days)</li> <li>Maximum Length of Stay  [Y/N]</li> <li>Dormitories (shared rooms) [Y/N]</li> <li>Single Use Rates : special rates for a single person to take an entire dorm room [Y/N]</li> </ul> </li> <li>Rate Plan/Packages [Y/N] <ul> <li>NOTE: rate plans/packages allow one hotel room type to have multiple prices &amp; restrictions, and sometimes separate availability.</li> <li>Close Outs : do you support special &quot;close out&quot; flags which enable rooms to be closed for specific days without setting availability or rates to zero.</li> <li>Closed Arrivals : can the property block arrivals on certain days</li> <li>Closed Departures : can the property block departures on certain days</li> </ul> </li> <li>Developer timezone, and estimated completion date.</li> <li>RoomInfo [Y/N] - Will RoomInfo (label, types, images) from MyAllocator be imported? (See Appendix)</li> <li>Any special input fields you require during signup, or pre-development questions you have.  Examples: <ul> <li>Multi Currency not supported - ex: please only send rates in Kyrgyzstanian Som (KGS)</li> </ul> </li> </ul> </li> <li>We'll review your answers and create a definition for the OTA. <ul> <li>We will send you the cid, and shared_secret that is required for the API calls.</li> <li>The API calls will not work until the definition is live, which will happen on our next development update (normally every two weeks).</li> </ul> </li> <li>At that point <ul> <li>The channel will display as &quot;in development&quot; for all clients to see.</li> <li>You will be able to use your trial account as a test harness for sending updates to your OTA.</li> <li>You may take as long as you need in development however as a courtesy we request you update our development team at least once every two weeks while in development with your current estimated completion date.</li> <li>OTA's which fail to provide an estimated completion date may have their participation eligibility rescinded.</li> <li>When you are finished with development please let us know and we'll change the status on the OTA to live so clients can use it.</li> </ul> </li> </ul>",
    "filename": "./build2us.pm",
    "groupTitle": "Getting_Started"
  },
  {
    "group": "Getting_Started",
    "type": "",
    "url": "/",
    "title": "Step 2 Configure Property on MA and OTA",
    "name": "Step_2",
    "version": "201707.0.1",
    "description": "<img src=\"/build2us-apidocs/img/image1.png\" width=\"700\" alt=\"Alt text\"> <p>Hotel Registration Steps:</p> <ol> <li>Customer selects OTA from list of channels on MA, enters hotel id or username, and password (regcode) and this is passed in a SetupProperty</li> <li>MA sends GetRooms and receives a list of Rooms configured on OTA, customer performs Room mapping of MA Room Types to OTA Room Types.</li> <li>Customer finalizes by performing a full refresh of all data to OTA Done!</li> </ol>",
    "filename": "./build2us.pm",
    "groupTitle": "Getting_Started"
  },
  {
    "group": "Getting_Started",
    "type": "",
    "url": "/",
    "title": "Step 3 Integrate SDK",
    "name": "Step_3_Integrate_SDK",
    "version": "201707.0.1",
    "description": "<img src=\"/build2us-apidocs/img/image2.png\" width=\"700\" alt=\"Alt text\"> <p>Hotel MA Daily Flow</p> <ol> <li>ARIUpdates are sent to OTA handler for Rates, Availability</li> <li>Periodic (30 minute) calls to GetBookingList</li> <li>GetBookingId is called for each BookingId</li> <li>Proceed to Booking Received Flow</li> </ol> <p>OTA Booking Notification (optional)</p> <ol> <li>New Booking arrives for property, notify MyAllocator via OTA API</li> <li>MyAllocator will call GetBookingId and download Booking</li> <li>Proceed to Booking Received Flow</li> </ol> <p>Booking Received Flow</p> <ol> <li>Notify PMS</li> <li>AutoAdjust</li> <li>ARIUpdate of new inventory to all OTA's</li> </ol>",
    "filename": "./build2us.pm",
    "groupTitle": "Getting_Started"
  },
  {
    "group": "Getting_Started",
    "type": "",
    "url": "/",
    "title": "Step 4: Get your first booking",
    "name": "Step_4",
    "version": "201707.0.1",
    "description": "<p>OUTBOUND rest api calls (json post to api_url) (from MyAllocator to OTA)</p> <img src=\"/build2us-apidocs/img/image4.png\" width=\"700\" alt=\"Alt text\">",
    "filename": "./build2us.pm",
    "groupTitle": "Getting_Started"
  },
  {
    "group": "Getting_Started",
    "type": "",
    "url": "/callback/ota/{cid}/v201503/NotifyBooking?ota_property_id={ota_property_id}&booking_id={booking_id}&output={json|pixel}",
    "title": "Tracking Pixels",
    "name": "Tracking_Pixels",
    "version": "201707.0.1",
    "description": "<p>NotifyBooking</p> <p>Requests MyAllocator to immediately request a booking based on the ota_property_id.<br> This should be fired/hit on any new booking OR any changes such as cancellations to an existing booking.</p> <p>It is acceptable to fire this for all bookings - even for properties which are connected to other channel managers.</p>",
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
    "description": "<p>This API allows an OTA (travel booking website) to integrate with MyAllocator by implementing a public-facing API receiver in their environment.</p> <p>The API integration may be developed in any language, however, we have provided a PHP SDK library and receiver that you may drop into your PHP environment to speed up integration. The PHP SDK may be found <a href=\"https://github.com/MyAllocator/myallocator-ota-php\">here</a>.</p> <p>Its as simple as:</p> <img src=\"/build2us-apidocs/img/image3.png\" width=\"700\" alt=\"Alt text\">",
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
        "content": "{\n    \"verb\":\"ARIUpdate\"\n    \"ota_property_id\":\"\",\n    \"mya_property_id\":\"\",\n    \"guid\":\"\",\n    \"currency\":\"USD\",\n    \"shared_secret\":\"\",\n    \"Inventory\": [\n        {\n            \"ota_room_id\": 123,     // always passed\n            \"ota_rate_id\": 456,     // only if rateplans are supported\n            \"start_date\": \"YYYY-MM-DD\", // always passed\n            \"end_date\": \"YYYY-MM-DD\",   // always passed\n            \"units\": 5,                 // conditionally passed\n            \"rate\": 50.00,          // conditionally passed\n            \"min_los\": 0,           // *only if ota capable\n            \"max_los\": 0,           // *only if ota capable\n            \"closearr\": false,      // *only if ota capable\n            \"closedep\": false,      // *only if ota capable\n            \"close\": false          // *only if ota capable\n        },\n        {\n            \"ota_room_id\": 123,\n            \"ota_rate_id\": 456,\n            \"start_date\": \"YYYY-MM-DD\",\n            \"end_date\": \"YYYY-MM-DD\",\n            \"units\": 5,\n            \"rate\": 50.00,\n            \"min_los\": 0,\n            \"max_los\": 0,       // max length of stay\n            \"closearr\": false,  // do not allow arrivals in this range\n            \"closedep\": false,  // do not allow departures in this range\n            \"close\": false      // do not allow bookings\n        }\n    ]\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n    \"success\":\"true\",\n    \"errors\": [\n        {\n            id:\"\",\n            type:\"\",\n            msg:\"\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Return availability for a room_id.  If OTA does not support a particular ota_room_id they should accept all good data, and flag the request &quot;success&quot;:&quot;warning&quot; with sufficient errors to describe the data.  This will flag the OTA in the user management interface as requiring  attention.</p> <p>Some fields are conditional, or will be passed conditionally.<br> Please only parse fields which are included</p>",
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
        "content": "{\n    \"Property\" : {\n        \"ota_cid\" : \"your_cid\",\n        \"verb\" : \"CreateProperty\",\n        \"shared_secret\" : \"****\",\n        \"guid\" : \"...\",\n\n        \"ota_property_id\" : \"\",               // For this call always empty\n        \"ota_property_password\" : \"\",         // For this call always empty\n        \n        \"mya_property_id\" : \"12345\",\n        \"name\" : \"Sample Hostel\",\n        \"country\" : \"US\",\n        \"currency\" : \"EUR\",\n        \"email_default\" : \"someone@example.com\",\n        \"email_channel_booking\" : \"bookings@example.com\",\n        \"default_min_los\" : 3,\n        \"default_max_los\" : 0,   // 0 means no max_los restriction\n        \"breakfast\" : \"\",        //  = Not available, IN = Included in price, EX = Excluded from price\n        \"weekend\" : [\n            \"tuesday\",\n            \"saturday\",\n            \"sunday\n        ],\n\n        \"firstname\" : \"John\",\n        \"lastname\"  : \"Smith\",\n        \"timezone\" : \"Asia/Thimphu\",\n\n        \"address\" : {\n            \"street\" : \"Main St\",\n            \"city\" : \"San Diego\",\n            \"zip\" : \"92120\",\n            \"state\" : \"CA\",\n            \"country\" : \"US\",\n            \"website\" : \"http://example.com\",\n            \"lon\" : \"32.715736\",\n            \"lat\" : \"-117.161087\",\n            \"phone\" : \"+1 123123123 \",\n            \"fax\" : \"+1 123123123\n        },\n\n        \"business_contact\": {\n            \"main_contact_name\": \"Jeff Johnson\",\n            \"company_name\": \"Hostels Inc.\",\n            \"account_manager_name\": \"Hillary Jackson\",\n            \"vat_id\": \"US2345678\",\n            \"street\": \"Office Street\",\n            \"state\": \"Office State\",\n            \"zip\": \"22222\",\n            \"city\": \"Office City\",\n            \"country\": \"DE\"\n        },\n\n\n        \"rooms\" : [\n            {\n                \"mya_room_id\" : 45829,\n                \"units\" : 5,                // Number of rooms for this type\n                \"beds\" : 2,               // Max. number of beds in that room\n                \"dormitory\" : false,\n                \"label\" : \"Double Room\",\n                \"description\" : \"A potentially long description about the room\",\n                \"images\" : [\n                    \"https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c37.jpg\",\n                    \"https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c38.jpg\",\n                    \"https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c39.jpg\n                ]\n            },\n            {\n                \"mya_room_id\" : 290,\n                \"units\" : 25,\n                \"beds\" : \"4\",\n                \"dormitory\" : false,\n                \"label\" : \"4-person private\",\n                \"description\" : null,\n                \"images\" : []\n            },\n            {\n                \"mya_room_id\" : 329,\n                \"units\" : 7,\n                \"beds\" : \"3\",\n                \"dormitory\" : false,\n                \"label\" : \"3-person private\",\n                \"description\" : \"Best three bed room in town\",\n                \"images\" : [\n                    \"https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c37.jpg\n                ]\n            },\n            {\n                \"mya_room_id\" : 52,\n                \"units\" : 3,\n                \"beds\" : \"30\",\n                \"dormitory\" : true,\n                \"gender\" : \"MIXED\",             // Can be MIXED, FEMALE, MALE\n                \"label\" : \"30-person mixed shared\",\n                \"description\" : null,\n                \"images\" : []\n            }\n        ]\n    }\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n    \"success\": true,\n    \"ota_property_id\": 1234,                    // Your (new) property ID\n    \"ota_property_password\": 1234,              // Optional additional parameter to allow connection\n    \"instruction_text\": \"It worked!\\n\\nNow click the link.\",   // Optional instructions\n    \"instruction_link\": \"http://ota.com/instructions\",         // Optional link to be displayed below instruction text\n\n    \"room_mappings\": [                    // Optional mapping\n        {\n            \"ota_room_id\" : \"11111\",      // Your (new) room ID\n            \"mya_room_id\" : 56789         // MA Room ID\n        },\n        {\n            \"ota_room_id\" : \"22222\",\n            \"mya_room_id\" : 24567\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Can be used to create a new property (including rooms) on your OTA based on the details that we have in myallocator (eg. property name, address, images, room details, etc). This call needs to be activated explicitly from our side before you can use it. Please talk to your myallocator contact before implementing this call!</p> <p>Once approved please provide us with your terms &amp; conditions for us to display to a property.</p> <p>We cannot guarantee that all of the following request fields will really be filled in.</p> <p>You need to return room_mappings to make the automatic full refresh work after successful property creation.</p> <p>The <strong>instruction text</strong> (instruction_text) will be displayed to the hotel after the property creation is complete. We will escape any HTML characters, so please only return plain text. You can include linebreaks (\\n) which will be converted into actual line breaks for HTML display.</p> <p>If an <strong>instruction link</strong> (instruction_link) is provided we will display the clickable link below the instruction text (if present).</p>",
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
        "content": "{\n    \"verb\":\"GetBookingId\",\n    \"ota_property_id\":\"\",\n    \"mya_property_id\":\"\",\n    \"guid\":\"\",\n    \"shared_secret\":\"\",\n    \"booking_id\":\"OTABookingID\",\n    \"version\":\"\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n    \"success\": true,\n    \"booking_id\": \"OTABookingID\",\n    \"ota_property_id\": \"\",\n    \"mya_property_id\": \"\",\n\n    \"Booking\": {\n        // see samples in github\n        // especially BuildToUs.json\n        // make sure to send ChannelRoomType (see notes about samples)\n        // never send RoomTypeIds: []\n    }\n}",
          "type": "json"
        },
        {
          "title": "Minimal Booking Example",
          "content": "{\n    \"OrderId\": \"8604168\",\n    \"IsCancellation\": false,\n    \"TotalCurrency\": \"USD\",\n    \"TotalPrice\": 134\n\n    \"Customers\": [\n        {\n            \"CustomerCountry\": \"US\",\n            \"CustomerEmail\": \"test@test.com\",\n            \"CustomerFName\": \"Test Firstname\",\n            \"CustomerLName\": \"Test Lastname\"\n        }\n    ],\n\n    \"Rooms\": [\n        {\n            \"ChannelRoomType\": \"abcdef\",\n            \"Currency\": \"USD\",\n            \"DayRates\": [\n                {\n                    \"Date\": \"2017-11-08\",\n                    \"Description\": \"Refundable Rate\",\n                    \"Rate\": 32.5\n                },\n                {\n                    \"Date\": \"2017-11-09\",\n                    \"Description\": \"Refundable Rate\",\n                    \"Rate\": 34.5,\n                    \"RateId\": \"13649\"\n                }\n            ],\n            \"EndDate\": \"2017-11-09\",\n            \"Price\": 134,\n            \"StartDate\": \"2017-11-08\",\n            \"Units\": 2\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p><a href=\"https://github.com/MyAllocator/bookingsamples\">Booking Examples</a></p> <p><strong>IMPORTANT</strong>: The github BookingSamples link above is intended for a PMS Integrating into MyAllocator. As an OTA there are a few key differences in the format.  OTA Bookings should <em>NEVER</em> include RoomTypeIds:[] node, instead pass &quot;ChannelRoomType&quot;:&quot;123&quot;.  Do not attempt to pass &quot;channel&quot;, or any field labelled starting with Myallocator* (all those will be setup automatically).</p> <p>Most fields are optional. The minimal booking example below lists which fields are required for a Build-to-us integration.</p> <p>Implementation suggestions: when testing make sure the MyAllocator test property has &quot;download bookings&quot; enabled or the booking will be saved in a queue and not visible during testing.  To enable login and go to Manage / General / Download new bookings. Default setting is &quot;off/disabled&quot;.  Once enabled please allow 30 minutes for the backend to start processing bookings. Also there may be a normal 1-2 minute period after a GetBookingId response before the booking is visible in the inbox.myallocator.com interface (the bookings are held in a temporary queue on our backend).</p> <p>For testing please use: <em>http://api.myallocator.com/callback/ota/{CID}/v201503/NotifyBooking?ota_property_id={OTA_PID}&amp;booking_id={OTA_ID}&amp;output=json&amp;debug=1</em></p> <p>That url (specifically the &amp;output=json&amp;debug=1 on the URL) will return additional debugging messaging which will provide insight into validation errors.</p>",
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
        "content": "{\n    \"verb\":\"GetBookingList\",\n    \"ota_property_id\":\"\",\n    \"mya_property_id\":\"\",\n    \"guid\":\"\",\n    \"shared_secret\":\"\",\n    \"ota_booking_version\":\"2017-06-22 12:09:19\"\n}",
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
    "description": "<p>Returns a list of bookings/reservations which have not been acknowledged or modified.</p> <p>With each request we send along <em>ota_booking_version</em>, which has the format <em>YYYY-MM-DD HH:MM:SS</em> and indicates the time in UTC we last successfully requested bookings. It can be undefined if no successful response has been received so far. Please use <em>ota_booking_version</em> to only return to us new or modified bookings made since then. To ensure that no booking is skipped due to a time-offset between your and our server make sure to always reduce 5 or more minutes from the time given. Example: we provide 2017-06-22 12:09:19, then please return all new/modified/cancalled bookings since 2017-06-22 12:04:19 (5 minutes before the time sent).</p> <p>If <em>ota_booking_version</em> is undefined/empty please return all bookings.</p>",
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
    "description": "<p>If your channel supports different rates per room and if we enabled you for rateplan support, we'll make a GetRatePlans call to your system to retrieve which rateplans you have.</p> <p>If a rateplan is tied to a specific room ID (on your channel), then set this room ID in ota_room_id. If a rateplan is applicable for all rooms, set ota_room_id to 0.</p> <p>Note that currently myallocator only supports updating one rateplan per room.</p>",
    "examples": [
      {
        "title": "Request",
        "content": "{\n    \"verb\": \"GetRatePlans\",\n    \"ota_property_id\": \"\",\n    \"mya_property_id\": \"\",\n    \"guid\": \"\",\n    \"shared_secret\": \"\"\n}",
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
        "content": "{\n    \"verb\":\"GetRoomTypes\",\n    \"ota_property_id\":\"\",\n    \"mya_property_id\":\"\",\n    \"guid\":\"\",\n    \"shared_secret\":\"\",\n    \"RoomInfo\":[ .. ]           // conditional, see RoomInfo Appendix\n}",
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
    "description": "<p>Purpose: gets a list of rooms configured on the OTA.</p> <p>Notes: occupancy should be the maximum number of people who can fit in the room. dorm indicates the room is shared with other guests.</p>",
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
          "content": "{\n    \"success\":\"true|false\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Purpose: Pinged prior to SetupProperty or other configuration requests to verify proper operation. Should always return true.  If the system is in scheduled maintenance this url should return true.</p>",
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
        "content": "{\n    \"verb\":\"SetupProperty\",\n    \"mya_property_id\":\"\",     \n    \"ota_property_id\":\"\",    \n    \"guid\":\"\",\n    \"shared_secret\":\"\",\n    \"ota_regcode\":\"\",\n    \"RoomInfo\":[ .. ]           // conditional, see RoomInfo Appendix\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Response",
          "content": "{\n    \"success\":\"true\",\n    \"ota_property_id\":\"\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Purpose: on the myallocator.com interface the client will go to the OTA setup by selecting the icon. There the user will be prompted to put in the ota_property_id and ota_regcode registration code (optional: provided by the ota). The ota_property_id will be retained by us and passed in every other call.</p> <p>Implementation suggestions:  ota_property_id should typically be a username or hotel id on the OTA.   The ota_regcode is typically a password used to access the OTA extranet by the client.    If successful then the mya_property_id should be stored by the ota and used in conjunction with the ota_property_id to verify identity (optional).   the mya_property_id will not change. there will always be a 1:1 mapping between ota_property_id and mya_property_id.</p>",
    "filename": "./build2us.pm",
    "groupTitle": "SDK_Reference"
  }
] });
