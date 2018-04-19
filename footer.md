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