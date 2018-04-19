define({
  "name": "Myallocator Build-To-Us API Documentation",
  "version": "201707.0.1",
  "description": "myallocator Build-To-Us API for OTA.",
  "title": "Build-To-Us",
  "url": "http://your.endpoint.com",
  "callback_url": "https://api.myallocator.com",
  "header": {
    "title": "Overview",
    "content": "<h1>Overview</h1>\n<h2>boo</h2>\n<ol>\n<li>\n<p>blah</p>\n</li>\n<li>\n<p>foo</p>\n</li>\n</ol>\n<p>This API allows an OTA (travel booking website) to integrate with MyAllocator by\nimplementing a public-facing API receiver in their environment.</p>\n<p>The API integration may be developed in any language, however, we have provided\na PHP SDK library and receiver that you may drop into your PHP environment to\nspeed up integration. The PHP SDK may be found\n<a href=\"https://github.com/MyAllocator/myallocator-ota-php\">here</a>.</p>\n<p>Its as simple as:</p>\n<img src=\"/build2us-apidocs/img/image3.png\" width=\"700\" alt=\"Alt text\">"
  },
  "footer": {
    "title": "Appendix",
    "content": "<table>\n<thead>\n<tr>\n<th> </th>\n<th> </th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ota</td>\n<td>online travel agency (ex: booking.com, or competitor)</td>\n</tr>\n<tr>\n<td>cid</td>\n<td>Channel ID - a four digit code used by myallocator uniquely identify a OTA.</td>\n</tr>\n<tr>\n<td>verb</td>\n<td>the action being performed. HealthCheck, SetupProperty, GetRoomTypes, GetBookingList, GetBookingId, SetAvailability</td>\n</tr>\n<tr>\n<td>mya_property_id</td>\n<td>the myallocator property id (included for debugging requests and support tickets)</td>\n</tr>\n<tr>\n<td>ota_property_id</td>\n<td>the property id on the ota</td>\n</tr>\n<tr>\n<td>guid</td>\n<td>a unique 36 character code which identifies a request. for highest security an ota should only accept/process a guid once (to avoid replay attacks).  useful for seeing if a request is a retry.   this is mostly used to introduce entropy into the request.</td>\n</tr>\n<tr>\n<td>shared_secret</td>\n<td>a shared secret between the OTA and MyAllocator.</td>\n</tr>\n<tr>\n<td>booking_id</td>\n<td>the booking id on the ota of a particular reservation</td>\n</tr>\n</tbody>\n</table>\n<p><strong>HTTPS Request:</strong>\njson payload will be transmitted in a json form parameter via form-data, and\nwith Content-Type of &quot;application/json&quot;\njson response should be of type &quot;application/json&quot;</p>\n"
  },
  "order": [
    "Overview",
    "Getting_Started",
    "SDK_Reference",
    "Callback_URLs__Optional_",
    "Appendix"
  ],
  "sampleUrl": false,
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2018-04-19T18:40:49.342Z",
    "url": "http://apidocjs.com",
    "version": "0.17.6"
  }
});
