=pod

@apiGroup Overview
@api /
@apiName Overview
@apiVersion 201707.0.1
@apiDescription

This API allows an OTA (travel booking website) to integrate with MyAllocator by
implementing a public-facing API receiver in their environment.

The API integration may be developed in any language, however, we have provided
a PHP SDK library and receiver that you may drop into your PHP environment to
speed up integration. The PHP SDK may be found
[here](https://github.com/MyAllocator/myallocator-ota-php).

Its as simple as:

<img src="/build2us-apidocs/img/image3.png" width="700" alt="Alt text">

=cut

=pod

@apiGroup Getting Started
@api / Step 1
@apiName Step_1
@apiVersion 201707.0.1
@apiDescription

* Setup a FREE trial account at inbox.myallocator.com
* Send an email to devhelp@myallocator.com and introduce yourself. Include the following details:
    * Your Domain Name/URL
    * API Receiver URL (the script on your servers which will receive requests from MyAllocator) -- this can be a development machine/test environment.
    * Attach a 36x36 Icon (for our user interface)
    * Signup/Registration URL for clients:
    * Special signup instructions: (will be displayed in our interface, and should help the hotel understand how to obtain setup credentials).
    * Administrative Contact (Name, Email, Phone, Skype, etc.)
    * Technical/Developer Contact
    * update_years: how many years in the future can availability be uploaded
    * Core Features:
        * Minimum Length of Stay  [Y/N]  (# days)
        * Maximum Length of Stay  [Y/N]
        * Dormitories (shared rooms) [Y/N]
        * Single Use Rates : special rates for a single person to take an entire dorm room [Y/N]
    * Rate Plan/Packages [Y/N]
        * NOTE: rate plans/packages allow one hotel room type to have multiple prices & restrictions, and sometimes separate availability.
        * Close Outs : do you support special "close out" flags which enable rooms to be closed for specific days without setting availability or rates to zero.
        * Closed Arrivals : can the property block arrivals on certain days
        * Closed Departures : can the property block departures on certain days
    * Developer timezone, and estimated completion date.
    * RoomInfo [Y/N] - Will RoomInfo (label, types, images) from MyAllocator be imported? (See Appendix)
    * Any special input fields you require during signup, or pre-development questions you have.  Examples:
        * Multi Currency not supported - ex: please only send rates in Kyrgyzstanian Som (KGS)
* We'll review your answers and create a definition for the OTA.
    * We will send you the cid, and shared_secret that is required for the API calls.
    * The API calls will not work until the definition is live, which will happen on our next development update (normally every two weeks).
* At that point
    * The channel will display as "in development" for all clients to see.
    * You will be able to use your trial account as a test harness for sending updates to your OTA.
    * You may take as long as you need in development however as a courtesy we request you update our development team at least once every two weeks while in development with your current estimated completion date.
    * OTA's which fail to provide an estimated completion date may have their participation eligibility rescinded.
    * When you are finished with development please let us know and we'll change the status on the OTA to live so clients can use it.

=cut

=pod

@apiGroup Getting Started
@api / Step 2 Configure Property on MA and OTA
@apiName Step_2
@apiVersion 201707.0.1
@apiDescription

<img src="/build2us-apidocs/img/image1.png" width="700" alt="Alt text">

Hotel Registration Steps:
1. Customer selects OTA from list of channels on MA, enters hotel id or
username, and password and this is passed in a SetupProperty
2. MA sends GetRooms and receives a list of Rooms configured on OTA, customer
performs Room mapping of MA Room Types to OTA Room Types.
3. Customer finalizes by performing a full refresh of all data to OTA
Done!

=cut

=pod

@apiGroup Getting Started
@api / Step 3 Integrate SDK
@apiName Step 3 Integrate SDK
@apiVersion 201707.0.1
@apiDescription

<img src="/build2us-apidocs/img/image2.png" width="700" alt="Alt text">

Hotel MA Daily Flow
1. ARIUpdates are sent to OTA handler for Rates, Availability
2. Periodic (30 minute) calls to GetBookingList
3. GetBookingId is called for each BookingId
4. Proceed to Booking Received Flow

OTA Booking Notification (optional)
1. New Booking arrives for property, notify MyAllocator via OTA API
2. MyAllocator will call GetBookingId and download Booking
3. Proceed to Booking Received Flow

Booking Received Flow
1. Notify PMS
2. AutoAdjust
3. ARIUpdate of new inventory to all OTA's

=cut

=pod

@apiGroup Getting Started
@api {POST|GET} /callback/ota/{cid}/v201503/NotifyBooking?ota_property_id={ota_property_id}&booking_id={booking_id}&output={json|pixel} NotifyBooking
@apiName NotifyBooking
@apiVersion 201707.0.1
@apiDescription
#NotifyBooking

Requests MyAllocator to immediately request a booking based on the
ota_property_id. This should be fired/hit on any new booking OR any changes such
as cancellations to an existing booking.

It is acceptable to fire this for all bookings - even for properties which are
connected to other channel managers.

=cut

=pod

@apiGroup Getting Started
@api / Step 4: Get your first booking
@apiName Step 4
@apiVersion 201707.0.1
@apiDescription

OUTBOUND rest api calls (json post to api_url) (from MyAllocator to OTA)

<img src="/build2us-apidocs/img/image4.png" width="700" alt="Alt text">

=cut

=pod

@apiGroup SDK Reference
@api {POST} / HealthCheck
@apiName HealthCheck
@apiVersion 201707.0.1
@apiExample Request
    {
        "verb":"HealthCheck"
        "mya_property_id":"",       // note: will be blank on healthcheck
        "ota_property_id":"",       // note: will be blank on healthcheck
        "shared_secret":""
    }
@apiSuccessExample {json} Response
{
    "success":"true|false"
}
@apiDescription

Purpose: Pinged prior to SetupProperty or other configuration requests to verify
proper operation. Should always return true.  If the system is in scheduled
maintenance this url should return true.

=cut

=pod

@apiGroup SDK Reference
@api {POST} / SetupProperty (required)
@apiName SetupProperty (required)
@apiVersion 201707.0.1
@apiExample Request
    {
        "verb":"SetupProperty",
        "mya_property_id":"",
        "ota_property_id":"",
        "ota_property_password":"",
        "guid":"",
        "shared_secret":"",
        "RoomInfo":[ .. ]           // conditional, see RoomInfo Appendix
    }
@apiSuccessExample {json} Response
    {
        "success":"true",
        "ota_property_id":""
    }
@apiDescription

Purpose: on the myallocator.com interface the client will go to the OTA setup by
selecting the icon. There the user will be prompted to put in the
ota_property_id and ota_property_password credentials (provided by the ota).
Both ota_property_id and ota_property_password will be retained by us and passed
in every call. Should you not need two identification fields please let us know
and we can set it to only ask for ota_property_id.

Implementation suggestions:  ota_property_id should typically be a username or
hotel id on the OTA. The ota_property_password is typically a password used to
access the OTA extranet by the client. If successful then the mya_property_id
should be stored by the ota and used in conjunction with the ota_property_id to
verify identity (optional). The mya_property_id will not change. There will
always be a 1:1 mapping between ota_property_id and mya_property_id.

=cut

=pod

@apiGroup SDK Reference
@api {POST} / GetRoomTypes (required)
@apiName GetRoomTypes (required)
@apiVersion 201707.0.1
@apiExample Request
    {
        "verb":"GetRoomTypes",
        "ota_property_id":"",
        "mya_property_id":"",
        "guid":"",
        "shared_secret":"",
        "RoomInfo":[ .. ]           // conditional, see RoomInfo Appendix
    }
@apiSuccessExample {json} Response
    {
        "success":true,
        "Rooms":[
            { "ota_room_id":"RoomIdOnOTA1", "title":"", "occupancy":##, "detail":"", "dorm":true },
            { "ota_room_id":"RoomIdOnOTA2", "title":"", "occupancy":##, "detail":"", "dorm":false },
            { "ota_room_id":"RoomIdOnOTA3", "title":"", "occupancy":##, "detail":"", "dorm":true }
        ]
    }
@apiDescription
Purpose: gets a list of rooms configured on the OTA.

Notes: occupancy should be the maximum number of people who can fit in the room.
dorm indicates the room is shared with other guests.

=cut

=pod

@apiGroup SDK Reference
@api {POST} / GetRatePlans
@apiName GetRatePlans
@apiVersion 201707.0.1

@apiDescription
If your channel supports different rates per room and if we enabled you for
rateplan support, we'll make a GetRatePlans call to your system to retrieve
which rateplans you have.

If a rateplan is tied to a specific room ID (on your channel), then set this
room ID in ota_room_id. If a rateplan is applicable for all rooms, set
ota_room_id to 0.

Note that currently myallocator only supports updating one rateplan per room.

@apiExample {json} Request
    {
        "verb": "GetRatePlans",
        "ota_property_id": "",
        "mya_property_id": "",
        "guid": "",
        "shared_secret": ""
    }
@apiSuccessExample {json} Response
    {
        "success": true,
        "RatePlans": [
            { "ota_room_id":"", "ota_rateplan_id":"xxx", "title":"Default rate" },
            { "ota_room_id":"", "ota_rateplan_id":"xxx", "title":"Non-refundable rate" }
        ]
    }

=cut

=pod

@apiGroup SDK Reference
@api {POST} / GetBookingList
@apiName GetBookingList
@apiVersion 201707.0.1
@apiExample {json} Request
{
    "verb":"GetBookingList",
    "ota_property_id":"",
    "mya_property_id":"",
    "guid":"",
    "shared_secret":"",
    "ota_booking_version":"2017-06-22 12:09:19"
}
@apiSuccessExample {json} Response
{
    "success":true,
    "Bookings":[
    { "booking_id":"###", "version":"optional" },
    { "booking_id":"###", "version":"optional" },
    { "booking_id":"###", "version":"optional" },
    ]
}

@apiDescription Returns a list of bookings/reservations which have not been
acknowledged or modified.

With each request we send along *ota_booking_version*, which has the format
*YYYY-MM-DD HH:MM:SS* and indicates the time in UTC we last successfully
requested bookings. It can be undefined if no successful response has been
received so far. Please use *ota_booking_version* to only return to us new or
modified bookings made since then. To ensure that no booking is skipped due to a
time-offset between your and our server make sure to always reduce 5 or more
minutes from the time given. Example: we provide 2017-06-22 12:09:19, then
please return all new/modified/cancalled bookings since 2017-06-22 12:04:19 (5
minutes before the time sent).

If *ota_booking_version* is undefined/empty please return all bookings.

=cut


=pod

@apiGroup SDK Reference
@api {POST} / GetBookingId
@apiName GetBookingId
@apiVersion 201707.0.1
@apiExample {json} Request
    {
        "verb":"GetBookingId",
        "ota_property_id":"",
        "mya_property_id":"",
        "guid":"",
        "shared_secret":"",
        "booking_id":"OTABookingID",
        "version":""
    }

@apiSuccessExample Minimal Booking Example
{
    "success": true,
    "booking_id": "OTABookingID",
    "ota_property_id": "",
    "mya_property_id": "",

    "Booking": {
        "OrderId": "8604168",
        "IsCancellation": false,
        "TotalCurrency": "USD",
        "TotalPrice": 134,

        "Customers": [
            {
                "CustomerCountry": "US",
                "CustomerEmail": "test@test.com",
                "CustomerFName": "Test Firstname",
                "CustomerLName": "Test Lastname"
            }
        ],

        "Rooms": [
            {
                "ChannelRoomType": "abcdef",
                "Currency": "USD",
                "DayRates": [
                    {
                        "Date": "2017-11-08",
                        "Description": "Refundable Rate",
                        "Rate": 32.5
                    },
                    {
                        "Date": "2017-11-09",
                        "Description": "Refundable Rate",
                        "Rate": 34.5,
                        "RateId": "13649"
                    }
                ],
                "EndDate": "2017-11-09",
                "Price": 134,
                "StartDate": "2017-11-08",
                "Units": 2
            }
        ]
    }
}

@apiDescription

[Booking Examples](https://github.com/MyAllocator/bookingsamples)

**IMPORTANT**: The github BookingSamples link above is intended for a PMS
Integrating into MyAllocator. As an OTA there are a few key differences in the
format.  OTA Bookings should _NEVER_ include RoomTypeIds:[] node, instead pass
"ChannelRoomType":"123".  Do not attempt to pass "channel", or any field
labelled starting with Myallocator* or myallocator_* (all those will be setup
automatically).

Most fields are optional. The minimal booking example below lists which fields
are required for a Build-to-us integration.

Prices: Send us sell rates (rates including taxes and fees). The sum of
all room prices should equal the TotalPrice field. Day rates should be per unit,
so the sum of all day rates multiplied by the number of units should equal the
room price.

Country codes: For CustomerCountry and CustomerNationality (if you include those
fields) make sure to pass the country code as uppercase Alpha-2 ISO-3166 codes.

Currency codes: Make sure they are valid ISO-4217 (uppercase).

Implementation suggestions: when testing make sure the MyAllocator test property
has "download bookings" enabled or the booking will be saved in a queue and not
visible during testing.  To enable login and go to Manage / General / Download
new bookings. Default setting is "off/disabled".  Once enabled please allow 30
minutes for the backend to start processing bookings. Also there may be a normal
1-2 minute period after a GetBookingId response before the booking is visible in
the inbox.myallocator.com interface (the bookings are held in a temporary queue
on our backend).

For testing please use:
*http://api.myallocator.com/callback/ota/{CID}/v201503/NotifyBooking?ota_property_id={OTA_PID}&booking_id={OTA_ID}&output=json&debug=1*

That url (specifically the &output=json&debug=1 on the URL) will return
additional debugging messaging which will provide insight into validation
errors.

=cut

=pod

@apiGroup SDK Reference
@api {POST} / ARIUpdate
@apiName ARIUpdate
@apiVersion 201707.0.1
@apiExample {json} Request
    {
        "verb":"ARIUpdate"
        "ota_property_id":"",
        "mya_property_id":"",
        "guid":"",
        "currency":"USD",
        "shared_secret":"",
        "Inventory": [
            {
                "ota_room_id" : "61365",     // always passed
                "ota_rate_id" : "rate_456",  // only if rateplans are supported
                "start_date" : "2018-01-22", // always passed
                "end_date" : "2018-02-12",   // always passed
                "units" : 5,                 // conditionally passed
                "rate" : "0.00",             // conditionally passed
                "max_los" : 14,              // *only if ota capable
                "min_los" : 2,               // *only if ota capable
                "closearr" : false,          // *only if ota capable
                "closedep": false,           // *only if ota capable
                "close" : false              // *only if ota capable
            },
            {
                "ota_room_id" : "61365",
                "ota_rate_id" : "rate_456",
                "start_date" : "2018-02-13"
                "end_date" : "2018-02-14",
                "units" : 0,
                "rate" : "309.00",
                "max_los" : 14,              // max length of stay
                "min_los" : 2,               // min length of stay
                "closearr": false,           // do not allow arrivals in this range
                "closedep": false,           // do not allow departures in this range
                "close": false               // do not allow bookings
            }
        ]
    }
@apiSuccessExample {json} Response
    {
        "success":"true",
        "errors": [
            {
                id:"",
                type:"",
                msg:""
            }
        ]
    }
@apiDescription

Return availability for a room_id. If OTA does not support a particular
ota_room_id they should return an error. This will flag the OTA in the
user management interface as requiring attention.

Some fields are conditional, or will be passed conditionally.
Please only parse fields which are included

=cut


=pod

@apiGroup SDK Reference
@api {POST} / CreateProperty
@apiName CreateProperty
@apiVersion 201707.0.1
@apiExample {json} Request
    {
        "mya_property_id" : "12345",
        "ota_cid" : "your_cid",
        "verb" : "CreateProperty",
        "shared_secret" : "****",
        "guid" : "...",

        "ota_property_id" : "",               // For this call always empty
        "ota_property_password" : "",         // For this call always empty

        "Property" : {
            "name" : "Sample Hostel",
            "country" : "US",
            "currency" : "EUR",
            "email_default" : "someone@example.com",
            "email_channel_booking" : "bookings@example.com",
            "default_min_los" : 3,
            "default_max_los" : 0,   // 0 means no max_los restriction
            "breakfast" : "",        //  = Not available, IN = Included in price, EX = Excluded from price
            "weekend" : [
                "tuesday",
                "saturday",
                "sunday"
            ],

            "firstname" : "John",
            "lastname"  : "Smith",
            "timezone" : "Asia/Thimphu",

            "address" : {
                "street" : "Main St",
                "city" : "San Diego",
                "zip" : "92120",
                "state" : "CA",
                "country" : "US",
                "website" : "http://example.com",
                "lon" : "32.715736",
                "lat" : "-117.161087",
                "phone" : "+1 123123123 ",
                "fax" : "+1 123123123"
            },

            "business_contact": {
                "main_contact_name": "Jeff Johnson",
                "company_name": "Hostels Inc.",
                "account_manager_name": "Hillary Jackson",
                "vat_id": "US2345678",
                "street": "Office Street",
                "state": "Office State",
                "zip": "22222",
                "city": "Office City",
                "country": "DE"
            },


            "rooms" : [
                {
                    "mya_room_id" : 45829,
                    "units" : 5,                // Number of rooms for this type
                    "beds" : 2,               // Max. number of beds in that room
                    "dormitory" : false,
                    "label" : "Double Room",
                    "description" : "A potentially long description about the room",
                    "images" : [
                        "https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c37.jpg",
                        "https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c38.jpg",
                        "https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c39.jpg"
                    ]
                },
                {
                    "mya_room_id" : 290,
                    "units" : 25,
                    "beds" : "4",
                    "dormitory" : false,
                    "label" : "4-person private",
                    "description" : null,
                    "images" : []
                },
                {
                    "mya_room_id" : 329,
                    "units" : 7,
                    "beds" : "3",
                    "dormitory" : false,
                    "label" : "3-person private",
                    "description" : "Best three bed room in town",
                    "images" : [
                        "https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c37.jpg"
                    ]
                },
                {
                    "mya_room_id" : 52,
                    "units" : 3,
                    "beds" : "30",
                    "dormitory" : true,
                    "gender" : "MIXED",             // Can be MIXED, FEMALE, MALE
                    "label" : "30-person mixed shared",
                    "description" : null,
                    "images" : []
                }
            ]
        }
    }
@apiSuccessExample {json} Response
{
    "success": true,
    "ota_property_id": 1234,                    // Your (new) property ID
    "ota_property_password": 1234,              // Optional additional parameter to allow connection
    "instruction_text": "It worked!\n\nNow click the link.",   // Optional instructions
    "instruction_link": "http://ota.com/instructions",         // Optional link to be displayed below instruction text

    "room_mappings": [                    // Optional mapping
        {
            "ota_room_id" : "11111",      // Your (new) room ID
            "mya_room_id" : 56789         // MA Room ID
        },
        {
            "ota_room_id" : "22222",
            "mya_room_id" : 24567
        }
    ]
}

@apiDescription Can be used to create a new property (including rooms) on your
OTA based on the details that we have in myallocator (eg. property name,
address, images, room details, etc). This call needs to be activated explicitly
from our side before you can use it. Please talk to your myallocator contact
before implementing this call!

Once approved please provide us with your terms & conditions for us to display
to a property.

We cannot guarantee that all of the following request fields will really be
filled in.

You need to return room_mappings to make the automatic full refresh work after
successful property creation.

The **instruction text** (instruction_text) will be displayed to the hotel after
the property creation is complete. We will escape any HTML characters, so please
only return plain text. You can include linebreaks (\n) which will be converted
into actual line breaks for HTML display.

If an **instruction link** (instruction_link) is provided we will display the
clickable link below the instruction text (if present).

=cut


=pod

@apiGroup Callback URLs (Optional)
@api /callback/ota/{cid}/v201506/ChannelList ChannelList
@apiName ChannelList
@apiVersion 201707.0.1
@apiHeaderExample {json} Response Header
{"Content-type":"application/json"}
@apiSuccessExample {json} Response
{
    "channels":[
            { "cid":"boo", "pretty":"Booking.com", "icon-url":"https://www.fullpath/to/cdn/image" },
            { "cid":"exp", "pretty":"Expedia", "icon-url":"https://www.fullpath/to/cdn/image" }
    ]
}

=cut

=pod

@apiGroup Callback URLs (Optional)
@api {POST|GET} /callback/ota/{cid}/v201506/RoomInfo RoomInfo
@apiName RoomInfo
@apiVersion 201707.0.1
@apiParam (Request) {string} shared_secret secret
@apiParam (Request) {string} mya_property_id property_id
@apiHeaderExample {json} Response Header
{"Content-type":"application/json"}
@apiSuccessExample {json} Response
{
        "RoomInfo":[ .. ] // see RoomInfo Appendix
}

=cut

=pod

@apiGroup Callback URLs (Optional)
@api {POST|GET} /callback/ota/{cid}/v201506/BookingCreate BookingCreate
@apiName BookingCreate
@apiVersion 201707.0.1
@apiParam (Request) {String} shared_secret secret
@apiParam (Request) {String} mya_property_id property_id
@apiParam (Request) {String} booking_json see booking samples
@apiHeaderExample {json} Response Header
{"Content-type":"application/json"}
@apiSuccessExample {json} Response
{
        "myallocator_id":"12345",
        "success":true
}
@apiDescription
**IMPORTANT: please record the myallocator_id for your records. If you implement
**BookingCreate you must also implement retry logic.  Please do not retry more
**than once per minute. Additionally the system will lock (block) multiple
**concurrent requests for the same property.

=cut

=pod

@apiGroup Callback URLs (Optional)
@api {POST|GET} /callback/ota/{cid}/v201506/ARIFullRefresh ARIFullRefresh
@apiName ARIFullRefresh
@apiVersion 201707.0.1
@apiParam (Request) {string} shared_secret secret
@apiParam (Request) {string} mya_property_id property_id
@apiDescription
This is for technical support on the remote OTA to enqueue a full refresh of the
property.

=cut

=pod

@apiGroup Appendix
@api / RoomInfo
@apiName RoomInfo
@apiVersion 201707.0.1
@apiSuccess (Response) {Object[]} RoomInfo Array of room information objects
@apiSuccess (Response) {Object} RoomInfo   Room information object
@apiSuccess (Response) {Number} RoomInfo/mya_room_id myallocator room type ID
@apiSuccess (Response) {Number} [RoomInfo/ota_room_id] channel room ID (if mapped)
@apiSuccess (Response) {Number} RoomInfo/beds Number of beds in the room type
@apiSuccess (Response) {Number} RoomInfo/units Number of rooms of this type
@apiSuccess (Response) {Boolean} RoomInfo/dormitory Whether it's a dorm (shared room) or private room.
@apiSuccess (Response) {String} RoomInfo/label Short name referencing the room type.
@apiSuccess (Response) {String} [RoomInfo/description] A most longer description of the room.

@apiSuccessExample {json} Room Info example
{
    "RoomInfo": [
        {
            "Images": [
                "http://path.to/image1.png",
                "http://path.to/image2.png"
            ],
            "beds": 1,
            "dormitory": false,
            "label": "Single Room",
            "description": "Single Room with a sea view",
            "mya_room_id": "1234",
            "ota_room_id": "",
            "units": 10
        },
        {
            "Images": [
                "http://path.to/image3.png",
                "http://path.to/image4.png"
            ],
            "beds": 2,
            "dormitory": false,
            "label": "Double Room",
            "description": "Double Room with a jacuzzi",
            "mya_room_id": "2345",
            "ota_room_id": "",
            "units": 15
        }
    ]
}
@apiDescription
RoomInfo (if enabled for your OTA by us) is conditionally returned in the
SetupProperty and GetRoomTypes call, and can also be accessed via the RoomInfo
Callback. To save bandwidth RoomInfo is only returned in
SetupProperty/GetRoomTypes if it is explicitly enabled in the OTA configuration
on MyAllocator.  The RoomInfo callback is always available. RoomInfo is only
necessary for deep integrations or situations where the OTA plans to
automatically/create destroy rooms using MyAllocator configuration. In a normal
integration this isn't very usual.

=cut

=pod

@apiGroup Appendix
@api / Special Considerations
@apiName Special Considerations
@apiVersion 201707.0.1
@apiDescription
JSON is a typeless language, by convention any associative array (hash) key
which begins with an Uppercase First Letter will return an array of hashes.
(These are not typos, they are intentional)

HTTP response codes should always be 200, with a content-type application/json,
gzip compression and keepalives will be used if supported.

=cut

=pod

@apiGroup Appendix
@api / Terminology
@apiName Terminology
@apiVersion 201707.0.1
@apiDescription
| &nbsp;| &nbsp; |
| -- | ----- |
|ota|online travel agency (ex: booking.com, or competitor)|
|cid|Channel ID - a four digit code used by myallocator uniquely identify a OTA.|
|verb|the action being performed. HealthCheck, SetupProperty, GetRoomTypes, GetBookingList, GetBookingId, SetAvailability|
|mya_property_id|the myallocator property id (included for debugging requests and support tickets)|
|ota_property_id|the property id on the ota|
|guid|a unique 36 character code which identifies a request. for highest security an ota should only accept/process a guid once (to avoid replay attacks).  useful for seeing if a request is a retry.   this is mostly used to introduce entropy into the request.|
|shared_secret|a shared secret between the OTA and MyAllocator.|
|booking_id|the booking id on the ota of a particular reservation|

**HTTPS Request:**
json payload will be transmitted in a json form parameter via form-data, and
with Content-Type of "application/json"
json response should be of type "application/json"

=cut
