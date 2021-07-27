=pod

@apiGroup Overview
@api /
@apiName Overview
@apiVersion 201707.0.1
@apiDescription

This API allows a OTA ("Online Travel Agency", also called "channel", or "travel
booking website") to integrate with the myallocator channel manager by
implementing a API receiver in their environment.

The API integration may be developed in any language, however, we have provided
a PHP SDK library and receiver that you may drop into your PHP environment to
speed up integration. The PHP SDK may be found
[here](https://github.com/MyAllocator/myallocator-ota-php).

It's as simple as:

<img src="/build2us-apidocs/img/image3.png" width="700"
    alt="Flowchart of connecting myallocator with your OTA"
    title="Flowchart of connecting myallocator with your OTA" />

=cut

=pod

@apiGroup Getting Started
@api / Step 1: Getting Started
@apiName Step_1
@apiVersion 201707.0.1
@apiDescription

* To be considered as a partner, please complete our [Partnership form](https://www.cloudbeds.com/partner-with-cloudbeds/). 
* Once submitted, your application will be placed in queue to be reviewed for fit and compatibility. We will reach out if the partnership is approved. 
    * In addition to an approval notification, you will be provided with a 72-hour link to our API Credential Request form, which will help you create a test account and define your channel on myallocator.
    * Upon completion of the API Credential Request form, you will be sent Test Account login information, Channel ID (cid), and the shared_secret that is required for the API calls.
* At this point...
    * The channel will be hidden from our user base while in development and only viewable by your designated test account.
    * You will be able to use your trial account as a test harness for sending updates to your channel.
    * We request that you update our team at least once every two weeks while in development with your estimated completion date.
    * Partners that fail to provide an estimated completion date may have their participation eligibility rescinded.
    * When you are finished with development please email [connectivity@myallocator.com](mailto:connectivity@myallocator.com) to schedule certification.
* Once certified, our team will inform you of next steps, including providing us with: 
    * Logos
    * Information about your serivce
    * Property setup information (obtaining setup credentials, activating the channel manager, etc.)
    * Contact Information to various departments of your business (support, marketing, etc.)

=cut

=pod

@apiGroup Getting Started
@api / Step 2: Configure property on myallocator and OTA
@apiName Step_2
@apiVersion 201707.0.1
@apiDescription

<img src="/build2us-apidocs/img/image1.png" width="700"
    alt="Configuring a myallocator property for use with your channel"
    title="Configuring a myallocator property for use with your channel" />

Setting up your OTA on myallocator from the hotel's perspective:
1. Hotel selects your OTA from list of channels on myallocator, enters hotel
ID or username, and password and this is passed in `SetupProperty`. This
verifies that the credentials given are correct.
2. Myallocator sends `GetRooms` and receives a list of rooms configured on the
OTA, hotel performs room mapping of myallocator room types to your OTA's room
types.
3. If you support rate plans, myallocator will also send a `GetRatePlans` API
request to include in the mapping process.
4. Hotel finalizes by performing a full refresh of all data to OTA.

=cut

=pod

@apiGroup Getting Started
@api / Step 3: Integrate SDK
@apiName Step 3: Integrate SDK
@apiVersion 201707.0.1
@apiDescription

<img src="/build2us-apidocs/img/image2.png" width="700"
    alt="API requests flow"
    title="API requests flow" />

Hotel daily flow
1. `ARIUpdate`s are sent to OTA whenever the availability, rates or restrictions
changed, or automatically updated due to an incoming booking. A full refresh may
be sent at any time.
2. Periodic calls to `GetBookingList`, depending on how this is configured for
your OTA.
3. `GetBookingId` is called for each `BookingId`
4. Proceed to Booking Received Flow

OTA booking notification (optional, but highly recommended)
1. New Booking arrives for property, notify myallocator via OTA API
2. Myallocator will call `GetBookingId` and download Booking
3. Proceed to Booking Received Flow

Booking Received Flow
1. Myallocator adjusts availability for the booking
2. Myallocator sends the booking to the property's PMS (if connected)
3. `ARIUpdate` of new availability to all connected OTAs, including the OTA that
generated the booking/modification/cancellation.

=cut

=pod

@apiGroup Getting Started
@api {POST|GET} /callback/ota/{cid}/v201503/NotifyBooking?ota_property_id={ota_property_id}&booking_id={booking_id} Step 4: NotifyBooking
@apiName Step 4: NotifyBooking
@apiVersion 201707.0.1
@apiDescription

Requests myallocator to immediately request a booking based on the
`ota_property_id` and the passed `booking_id`. This should be fired/hit on any
new booking OR any changes such as cancellations to an existing booking.

It is acceptable to fire this for all bookings - even for properties which are
connected to other channel managers.

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
    "success":true|false
}
@apiDescription

Purpose: Pinged prior to SetupProperty or other configuration requests to verify
proper operation. Should always return true.

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
        "ota_property_id": "CID_123",
        "ota_property_password":"",
        "guid":"",
        "shared_secret":"",
        "RoomInfo":[ .. ]           // conditional, see RoomInfo Appendix
    }
@apiSuccessExample {json} Response
    {
        "success":true,
        "ota_property_id": "CID_123"
    }
@apiDescription

On the myallocator.com interface the hotel will go to the OTA setup by
selecting the icon. There the user will be prompted to put in the credentials
(`ota_property_id` and `ota_property_password`), which is provided by your OTA.
Both `ota_property_id` and `ota_property_password` will be retained by us and
passed in every call. Should you not need two identification fields please let
us know and we can set it to only ask for `ota_property_id`. However, this would
mean that some kind of activation process is required where our customer
support team enters the ID on behalf of the hotel. Otherwise it would be
possible for the hotel to enter someone else's credentials.

Implementation suggestions: `ota_property_id` should typically be a username or
hotel ID on your OTA. The `ota_property_password` is typically a password used
by the hotel to access your OTA's extranet.

=cut

=pod

@apiGroup SDK Reference
@api {POST} / GetSubProperties
@apiName GetSubProperties
@apiVersion 201707.0.1
@apiExample Request
    {
        "verb":"GetSubProperties"
        "mya_property_id":"",
        "ota_property_id": "CID_123",
        "shared_secret":""
    }
@apiSuccessExample {json} Response
    {
        "success":true,
        "SubProperties":[
            { "ota_property_sub_id": "", "title":"" },
            { "ota_property_sub_id": "", "title":"" },
        ]
    }
@apiDescription

Some OTAs only tie one property to a specific login username/password where the
username is also the `ota_property_id`. Others allow for one username/password
to be associate with multiple properties. In this second case, each OTA property
identifier is stored as an `ota_property_sub_id` in order to be handled
separately from the hotel's OTA username. This method call should return all of
the properties (`ota_property_sub_id`s) associated with the hotel's
username/password so that the correct `ota_property_sub_id` can be linked with
our `mya_property_id` for a specific property.

**IMPORTANT**: Please contact us to enable this capability for your OTA. It is NOT
enabled by default. It is only necessary if your OTA allows for multiple
properties associated with one login username/password.

Implementation suggestions: `ota_property_sub_id` will be the OTA identifier for
a specific property managed by the hotel while the title is that property's
name. This method will allow the hotel to map their myallocator property with
the OTA's `ota_property_sub_id` when setting up the property-OTA association
on myallocator.

=cut

=pod

@apiGroup SDK Reference
@api {POST} / GetRoomTypes (required)
@apiName GetRoomTypes (required)
@apiVersion 201707.0.1
@apiExample Request
    {
        "verb":"GetRoomTypes",
        "ota_property_id": "CID_123",
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

Should return a list of rooms configured for the passed credentials.

Notes: occupancy should be the maximum number of people who can fit in the room.
`dorm` indicates that the room is shared with other guests.

=cut

=pod

@apiGroup SDK Reference
@api {POST} / GetRatePlans
@apiName GetRatePlans
@apiVersion 201707.0.1

@apiDescription

If your channel supports different rates per room and **if we enabled the OTA**
for rate plan support, we'll make a `GetRatePlans` call to the OTA to retrieve
which rate plans you have configured for the passed credentials.

If a rate plan is tied to a specific room ID (on your channel), then set this
room ID in `ota_room_id`. If a rate plan is applicable for all rooms, set
`ota_room_id` to 0.

@apiExample {json} Request
    {
        "verb": "GetRatePlans",
        "ota_property_id": "CID_123",
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
    "ota_property_id": "CID_123",
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

@apiDescription

Should returns a list of bookings/reservations which have not been acknowledged or
modified.

With each request we send along `ota_booking_version`, which has the format
`YYYY-MM-DD HH:MM:SS` and indicates the time in UTC we last successfully
requested bookings. It can be undefined if no successful response has been
received so far. Please use `ota_booking_version` to only return to us new or
modified bookings made since then. To ensure that no booking is skipped due to a
time-offset between your and our server make sure to always reduce 5 or more
minutes from the time given. Example: we provide 2017-06-22 12:09:19, then
please return all new/modified/cancalled bookings since 2017-06-22 12:04:19 (5
minutes before the time sent).

If `ota_booking_version` is undefined/empty please return all bookings.

=cut

=pod

@apiGroup SDK Reference
@api {POST} / CancelBooking
@apiName CancelBooking
@apiVersion 201707.0.1
@apiExample {json} Request
{
    "verb":"CancelBooking",
    "ota_property_id": "CID_123",
    "mya_property_id":"",
    "shared_secret":"",
    "booking_id":"",
    "reason":""
}
@apiSuccessExample {json} Response
    {
        "success":true,
    }
@apiErrorExample {json} Response
    {
        "success":false,
        "errors":[
            { "id":"4002", "msg":"Booking is already canceled" }
        ]
    }

@apiDescription

Allows a property to cancel a booking on your system from the myallocator side.

IMPORTANT: Please contact us to enable this capability for your channel. It is
NOT enabled by default.

The reason why the booking is to be canceled is given in the `reason` field.
If the booking cannot be canceled the error code should be provided. Here
are possible error codes

* 4001 - booking has already departed
* 4002 - booking is already canceled
* 4003 - booking cannot be canceled. The reason is provided in the `msg` field.


=cut

=pod

@apiGroup SDK Reference
@api {POST} / GetBookingId
@apiName GetBookingId
@apiVersion 201707.0.1
@apiExample {json} Request
    {
        "verb":"GetBookingId",
        "ota_property_id": "CID_123",
        "mya_property_id":"",
        "guid":"",
        "shared_secret":"",
        "booking_id":"123456789",
        "version":""
    }

@apiSuccessExample Minimal Booking Example
{
    // Any orange text is a JSON Boolean value, NOT a string value.
    // Do not surround these field values in double quotes.
    "success": true,
    "booking_id": "123456789", // should be same as OrderId
    "ota_property_id": "CID_123",
    "ota_property_sub_id": "", // Required only if your channel uses the
                               // GetSubProperties method. This field must be
                               // set to the unique channel property identifier.
    "mya_property_id": "",

    "Booking": {
        "OrderId": "123456789",
        "OrderDate": "2018-04-22",
        "OrderTime": "18:02:58",
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
                "ChannelRoomType": "abcdef", // This is the room identifier on your channel
                "Currency": "USD",
                "DayRates": [
                    {
                        "Date": "2017-11-08",
                        "Description": "Refundable Rate",
                        "Rate": 32.5,
                        "Currency": "USD",
                        "RateId": "13649"
                    },
                    {
                        "Date": "2017-11-09",
                        "Description": "Refundable Rate",
                        "Rate": 34.5,
                        "Currency": "USD",
                        "RateId": "13649"
                    }
                ],
                "StartDate": "2017-11-08",
                "EndDate": "2017-11-09", // Set equal to last full day of stay
                                         // (departure date minus 1)
                                         // In this example, the booking is for two nights
                "Price": 134,
                "Units": 2
            }
        ],
	"Payments": [] // Include this field only if supplying payment data.
                       // Please see BookingCreate section below for required fields.
    }
}

@apiDescription

The booking format is described
[here in full detail](https://github.com/MyAllocator/build2us-apidocs/blob/gh-pages/booking_format_b2u.md).

We also have a page with
[Booking Examples](https://github.com/MyAllocator/bookingsamples)
from different channels.

**IMPORTANT**: The github BookingSamples link above is intended for a PMS
integrating into myallocator. As an OTA there are a few key differences in the
format.  OTA Bookings should _NEVER_ include `RoomTypeIds:[]` node, instead pass
`"ChannelRoomType":"123"`.  Do not attempt to pass `channel`, or any field
labelled starting with `MyAllocator*` or `myallocator_*` (all those will be
setup automatically).

Most fields are optional. The minimal booking example below lists which fields
are required for a Build-to-us integration.

Prices: Send us sell rates (rates including taxes and fees). The sum of
all room prices should equal the TotalPrice field. Day rates should be per unit,
so the sum of all day rates multiplied by the number of units should equal the
room price.

Country codes: For CustomerCountry and CustomerNationality (if you include those
fields) make sure to pass the country code as uppercase Alpha-2 ISO-3166 codes.

Currency codes: Make sure they are valid ISO-4217 (uppercase).

Make sure to provide `OrderDate` and `OrderTime`. Tell us which timezone the
date and time is in before the certification. We recommend UTC.

Implementation suggestions: when testing make sure the myallocator test property
has "download bookings" enabled or the booking will be saved in a queue and not
visible during testing.  To enable login and go to MANAGE / General Details /
Download new bookings from channels. Default setting is "Off". Once enabled
please allow 30 minutes for the backend to start processing bookings. Also there
may be a normal 1-2 minute period after a `GetBookingId` response before the
booking is visible in the inbox.myallocator.com interface (the bookings are held
in a temporary queue on our backend).

For testing please use:
`*http://api.myallocator.com/callback/ota/{CID}/v201503/NotifyBooking?ota_property_id={OTA_PID}&booking_id={OTA_ID}`

=cut

=pod

@apiGroup SDK Reference
@api {POST} / ARIUpdate
@apiName ARIUpdate
@apiVersion 201707.0.1
@apiExample {json} Request
    {
        "verb":"ARIUpdate",
        "ota_property_id": "CID_123",
        "ota_property_password" : "very:secret-password",
        "mya_property_id" : "25678",
        "guid" : "",
        "currency" : "USD",
        "ota_cid" : "",
        "shared_secret" : "",
        "Inventory" : [
            {
                "ota_room_id" : "61365",     // always passed
                "ota_rate_id" : "rate_456",  // only if rate plans are supported
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
@apiSuccessExample {json} Success Response
    {
        "success":true
    }
@apiErrorExample {json} Error Response (invalid credentials)
    {
        "success":false,
        "errors": [
            {
                "id": "1001",
                "msg": "The login details you provided are incorrect. Please update your channel details."
            }
        ]
    }
@apiDescription

This call is used to send availability, rates and restrictions to your OTA. We
will combine the updates into as few date ranges as possible, and we split
bigger updates into several API requests.

If you have been enabled for rate plan support then `ota_rate_id` will contain
your rate plan ID. Note that myallocator only supports availability on the room
level, so for the same `ota_room_id` and the same date range the availability
will always be the same. Only restrictions and rates are sent on the rate plan
level.


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

            "images" : [
                {
                    "url": "https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c37.jpg",
                    "description": "Outside View",
                    "sort_order": 1
                },
                {
                    "url": "https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c38.jpg",
                    "description": "Reception Area",
                    "sort_order": 2
                }
            ],

            "rooms" : [
                {
                    "mya_room_id" : 45829,
                    "units" : 5,                // Number of rooms for this type
                    "beds" : 2,               // Max. number of beds in that room
                    "dormitory" : false,
                    "label" : "Double Room",
                    "description" : "A potentially long description about the room",
                    "images" : [
                        {
                            "url": "https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c37.jpg",
                            "description": "Double bed",
                            "sort_order": 1
                        },
                        {
                            "url": "https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c38.jpg",
                            "description": "Bath room",
                            "sort_order": 2
                        },
                        {
                            "url": "https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c99.jpg",
                            "description": "Balcony",
                            "sort_order": 3
                        }
                    ],
                    "rateplans" : [
                       {
                          "mya_rate_id" : 0,
                          "label_public" : "Default Rate Plan",
                          "label_private" : "Default Rate Plan"
                       },
                       {
                          "label_public" : "Non-refundable",
                          "label_private" : "NR",
                          "mya_rate_id" : 850
                       },
                       {
                          "label_public" : "With Breakfast",
                          "label_private" : "BR",
                          "mya_rate_id" : 851
                       }
                    ]
                },
                {
                    "mya_room_id" : 290,
                    "units" : 25,
                    "beds" : "4",
                    "dormitory" : false,
                    "label" : "4-person private",
                    "description" : null,
                    "images" : [],
                    "rateplans" : [
                       {
                          "label_private" : "Default Rate Plan",
                          "label_public" : "Default Rate Plan",
                          "mya_rate_id" : 0
                       }
                    ]
                },
                {
                    "mya_room_id" : 329,
                    "units" : 7,
                    "beds" : "3",
                    "dormitory" : false,
                    "label" : "3-person private",
                    "description" : "Best three bed room in town",
                    "images" : [
                        {
                            "url": "https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c37.jpg",
                            "description": "3-bed room",
                            "sort_order": 1
                        }
                    ],
                    "rateplans" : [
                       {
                          "label_public" : "Default Rate Plan",
                          "label_private" : "Default Rate Plan",
                          "mya_rate_id" : 0
                       },
                       {
                          "mya_rate_id" : 853,
                          "label_private" : "NR",
                          "label_public" : "Non-refundable"
                       }
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
                    "images" : [],
                    "rateplans" : [
                       {
                          "mya_rate_id" : 0,
                          "label_public" : "Default Rate Plan",
                          "label_private" : "Default Rate Plan"
                       },
                       {
                          "mya_rate_id" : 852,
                          "label_public" : "Non-refundable",
                          "label_private" : "NR"
                       }
                    ]
                }
            ]
        }
    }
@apiSuccessExample {json} Response
{
    "success": true,
    "ota_property_id": "CID_123",                              // Your (new) property ID
    "ota_property_password": "secret_password",                // Optional additional parameter to allow connection
    "instruction_text": "It worked!\n\nNow click the link.",   // Optional instructions
    "instruction_link": "http://ota.com/instructions",         // Optional link to be displayed below instruction text

    "room_mappings": [                    // Automatic room/rate plan mapping
        {
            "ota_room_id" : "11111",      // Your (new) room ID
            "mya_room_id" : 45829,        // Myallocator room ID
            "ota_rate_id" : "rp6623",     // Your (new) rate plan ID
            "mya_rate_id" : 0             // Myallocator rate plan ID, always 0 for default rate plan
        },
        {
            "ota_room_id" : "11111",
            "mya_room_id" : 45829,
            "ota_rate_id" : "rp6624",
            "mya_rate_id" : 850
        },
        {
            "ota_room_id" : "11111",
            "mya_room_id" : 45829,
            "ota_rate_id" : "rp6624",
            "mya_rate_id" : 851
        },
        {
            "ota_room_id" : "22222",
            "mya_room_id" : 290,
            "ota_rate_id" : "rp6625",
            "mya_rate_id" : 0
        },
        {
            "ota_room_id" : "22222",
            "mya_room_id" : 290,
            "ota_rate_id" : "rp6626",
            "mya_rate_id" : 853
        }
    ]
}

@apiDescription

Can be used to create a new property (including rooms) on your OTA based on the
details that we have in myallocator (eg. property name, address, images, room
details, etc). This call needs to be activated explicitly from our side before
you can use it. Please talk to your myallocator contact before implementing
this call!

Rate plan information was added at a later date and is only transmitted for new
build-to-us implementations or if the feature has been enabled explicitly. Note
that every room has a default rate plan, and the ID (even across different
rooms) is always `0`.

Once approved please provide us with your terms & conditions for us to display
to a property. You should provide them as a HTML file with only basic styling.

We cannot guarantee that all of the following request fields will really be
filled in.

You need to return `room_mappings` to make the automatic full refresh work after
successful property creation. If you do not support rate plans you do not need
to return `ota_rate_id` and `mya_rate_id`.

The **instruction text** (`instruction_text`) will be displayed to the hotel
after the property creation is complete. We will escape any HTML characters, so
please only return plain text. You can include linebreaks (\n) which will be
converted into actual line breaks for HTML display.

If an **instruction link** (`instruction_link`) is provided we will display the
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
@apiParam (Request) {string} mya_property_id myallocator property ID
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
@apiParam (Request) {string} shared_secret secret
@apiParam (Request) {string} mya_property_id myallocator property ID
@apiParam (Request) {string} ota_property_id property ID on OTA side
@apiParam (Request) {string} booking_json see booking samples
@apiHeaderExample {json} Response Header
{"Content-type":"application/json"}
@apiParamExample {json} Format of Payment Data
"Payments" : [
      {
      "CardCode" : "VI", // Required. See above link for accepted card codes
      "CardNumber" : 5111111111111111, // Required
      "SeriesCode" : 111, // Three digit CVV number from back of card
      "ExpireDate" : 0417,
      "CardHolderName" : "John Smith",
      "Address" : {
         "AddressLine" : "123 Street Lane",
         "CityName" : "City",
         "StateCode" : "LA",
         "CountryCode" : "USA",
         "PostalCode" : 12345
      }
   }
]
@apiSuccessExample {json} Response
{
        "success":true
}
@apiDescription

You may use either `ota_property_id` (it may be resolved into a number of
myallocator IDs) or `mya_property_id`. You can also send payment information in
the `booking_json` field that will be encrypted and stored in myallocator.
Please see the example of format below (or see full booking examples
[here](https://github.com/MyAllocator/bookingsamples)). If including payment
data, insert the `Payments` array inside the `Booking` hash (see the [Minimal
Booking
Example](https://myallocator.github.io/build2us-apidocs/index.html#success-examples-SDK_Reference-GetBookingId-201707_0_1-0)).
The only required fields are `CardCode` and `CardNumber`. The remaining fields
aren't required, but encouraged. Here is a list of [accepted card
codes](https://github.com/MyAllocator/apidocs/blob/gh-pages/card-list.md).

**IMPORTANT**: If you implement `BookingCreate` you must also implement retry
logic. Please do not retry more than once per minute. Additionally the system
will block multiple concurrent requests for the same property.

=cut

=pod

@apiGroup Callback URLs (Optional)
@api {POST|GET} /callback/ota/{cid}/v201506/ARIFullRefresh ARIFullRefresh
@apiName ARIFullRefresh
@apiVersion 201707.0.1
@apiParam (Request) {string} shared_secret secret
@apiParam (Request) {string} mya_property_id myallocator property ID
@apiParam (Request) {string} ota_property_id property ID on OTA side
@apiDescription

This is for technical support on the remote OTA to enqueue a full refresh of the
property. You may use either `ota_property_id` (it may be resolved into a number of
myallocator IDs) or `mya_property_id`.

Note that full refreshes are usually heavy operations, so only call this when
absolutely neccessary.

=cut

=pod

@apiGroup Appendix
@api / Booking Format
@apiName Booking Format
@apiVersion 201907.0.1
@apiDescription

Please [check this
document](https://github.com/MyAllocator/build2us-apidocs/blob/gh-pages/booking_format_b2u.md)
for all possible booking fields, their meanings and the pricing relations.

=cut

=pod

@apiGroup Appendix
@api / Error Codes
@apiName Error Codes
@apiVersion 202006.0.1
@apiDescription

You can respond with error IDs listed in our
[error code list](https://apidocs.myallocator.com/ota-errors.html). Please use
the numeric codes in the `ID` column. Only errors whose code starts with
`FAULT.OTA.` are supported.

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
@apiSuccess (Response) {String} [RoomInfo/description] A longer description of the room.

@apiSuccessExample {json} Room Info example
{
    "RoomInfo": [
        {
            "images": [
                {
                    "url": "https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c37.jpg",
                    "description": "View from balcony",
                    "sort_order": 1
                },
                {
                    "url": "https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c38.jpg",
                    "description": "Inside View",
                    "sort_order": 2
                }
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
            "images": [
                {
                    "url": "https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c39.jpg",
                    "description": "Jacuzzi",
                    "sort_order": 1
                },
                {
                    "url": "https://inbox.myallocator.com/n/user_image.xt?pid=1&img=97f471e5-5898-4e9a-ab94-da0751e19c40.jpg",
                    "description": "Double Bed",
                    "sort_order": 2
                }
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
`SetupProperty` and `GetRoomTypes` call, and can also be accessed via the
`RoomInfo` callback. To save bandwidth `RoomInfo` is only returned in
`SetupProperty`/`GetRoomTypes` if it is explicitly enabled in the OTA
configuration on myallocator.  The `RoomInfo` callback is always available.
`RoomInfo` is only necessary for deep integrations or situations where the OTA
plans to automatically/create destroy rooms using myallocator configuration. In
a normal integration this isn't very usual.

=cut

=pod

@apiGroup Appendix
@api / Special Considerations
@apiName Special Considerations
@apiVersion 201707.0.1
@apiDescription

HTTP requests have the content-type `application/json`, with the payload being
in the body of the request. Gzip compression and keep-alives will be used if
supported. HTTPS (SSL encryption) is required for your endpoint.

HTTP response codes from myallocator should always be 200. They have the
content-type `application/json`.

Note that the `success` field should have boolean type. All other data types in
`success` field will cause a `FAULT.API.INVALID_SUCCESS` error.

=cut

=pod

@apiGroup Appendix
@api / Rate plan support
@apiName Rate plan support
@apiVersion 201707.0.1
@apiDescription

If your OTA supports rate plans make sure that:
1) You've implemented the `GetRatePlans` API call.
2) You've told us that you support rate plans, and that we've enabled rate plan support for your OTA.
3) You've implemented the "close" restriction for `ARIUpdate` calls.
4) You return rate plan details in the bookings. Specifically `RateId`/`RateDesc` on the `Rooms` level, and `RateId` on the `Rooms/DayRates` level.

On myallocator rooms and rate plans have a one-to-many relationship. This means
that a room has one or more rate plans, and each rate plan has exactly one room.
For the `ARIUpdate` calls we can send different `ota_rate_id` values for the
same `ota_room_id`. Rates and restrictions are tied to rate plans, while
availability is tied to rooms, so the `units` will be constant across different
rate plans for the same dates and for the same room, but rates and restrictions
can vary. To close off a rate plan we are using the `close` flag.

=cut

=pod

@apiGroup Appendix
@api / Terminology
@apiName Terminology
@apiVersion 201707.0.1
@apiDescription
| &nbsp;| &nbsp; |
| -- | ----- |
|OTA|Online travel agency (ex: booking.com, or competitor)|
|cid|Channel ID - a two to four character code used by myallocator uniquely identify a OTA.|
|verb|The action being performed. HealthCheck, SetupProperty, GetRoomTypes, GetBookingList, GetBookingId, SetAvailability.|
|mya_property_id|The myallocator property ID (included for debugging requests and support tickets)|
|ota_property_id|The property ID on the OTA (can be a user name or similar alphanumeric ID)|
|guid|A unique 36 character code which identifies a request. For highest security an ota should only accept/process a GUID once (to avoid replay attacks). Useful for seeing if a request is a retry. This is mostly used to introduce entropy into the request. |
|shared_secret|A shared secret between the OTA and myallocator.|
|booking_id|The booking ID on the OTA of a particular reservation.|

=cut
