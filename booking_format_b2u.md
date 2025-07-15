# Booking Format Documentation

## Root elements

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| Customers | Yes | Customer[] | See below in the Customer section |
| IsCancellation | Yes | Enum(0,1) | `1` if booking is cancelled. |
| IsModification | Yes | Enum(0,1) | `1` if booking is modified. |
| OrderAdults | Yes | Int >= 0 | Total number of unique adults. Adult age threshold is defined by the channel. Should equal sum of `Adults` in each room if this breakdown is given. |
| OrderChildren | Yes | Int >= 0 | Total number of unique children or babies. Child/baby age threshold is defined by the channel. Should equal sum of `Children` plus `Babies` in each room if this breakdown is given. |
| OrderCustomers | Yes | Int >= 0 | Total number of unique customers. Should equal sum of `Occupancy` in each room if this breakdown is given. Should also equal the sum of `OrderAdults` and `OrderChildren` if those fields are present. |
| OrderDate | Yes | YYYY-MM-DD | Date of booking creation, in UTC (not date when modified!). |
| OrderId | Yes | String | Unique booking ID on your channel. Maximum of 64 characters. |
| OrderTime | Yes | HH:MM:SS | Time of booking creation, in UTC. If seconds are not provided, set value to ":00".  Presence of `OrderTime` requires presence of `OrderDate`. |
| Rooms | Yes | Room[] | See below in the Room section |
| TotalCurrency | Yes | CurrencyCode | Currency code for the `TotalPrice` field. |
| TotalPrice | Yes | Currency | Total price of the booking, including taxes, commission and deposit, after discounts. It should reflect the price the guest will have to pay in total (or has already paid). |
| Balance | | Currency | The outstanding amount to be paid by the customer. This should be the same as `TotalPrice` - `Deposit`. |
| BalanceCurrency | | CurrencyCode | Currency code for the `Balance` field. Required if `Balance` is present. |
| Discounts | | Discount[] | See below in the Discount section |
| CancellationFee | | Currency |  The total amount of cancellation fees a guest has to pay because the cancellation was out of the cancellation policy. |
| CancellationFeeCurrency | | CurrencyCode | Currency code for the `CancellationFee` field. Always provide if `CancellationFee` is present. |
| CancellationId | | String | Cancellation ID provided by the channel. |
| CancellationReason | | String | Only provide when `IsCancellation` = `1`. Reason given by property or guest as to why booking was cancelled. |
| GuestNoShow | | Boolean | Only present when `IsCancellation` = `true` and if a guest is reported as not showing up. |
| Commission | | Currency | Amount of commission on the booking, included in the `TotalPrice`. Commission is an absolute amount of currency to be paid to the channel. This field does not indicate whether the commission is already paid or not. |
| CommissionCurrency | | CurrencyCode | Currency code for the `Commission` field. Required if `Commission` is present. |
| CommissionPercentage | | Float | Percentage of commission on the booking. |
| CommissionableAmount | | Currency | Amount of commissionable revenue. The percentage defined in `CommissionPercentage` is applied to `CommissionableAmount` to calculate the final commission `Commission`. |
| CustomerAssociations | | CustomerAssociation[] | See below in the CustomerAssociation section |
| Deposit | | Currency | Amount of deposit this booking has already received. Included in `TotalPrice` |
| DepositCurrency | | CurrencyCode | Currency code for the `Deposit` field. Required if `Deposit` is present. |
| DepositType | | Enum(...) | Possible deposit types are: `ota`, `vcc`, `manual`, `cc`, `bank_transfer`, `voucher`, `directbill` |
| ExternalReferences | | ExternalReference[] | See below in the ExternalReference section |
| MessageThreadId | | String | Some channels provide communication between host and guest in the form of message threads. A reservation-associated message thread ID can be stored here. |
| ExtraServices | | ExtraService[] | See below in the ExtraService section |
| ExtraTaxes | | ExtraTax[] | See below in the ExtraTax section |
| IsTentative | | Enum(0,1) | `1` if the booking is not yet confirmed and availability should not yet be reduced. This can apply to booking enquiries where the property owner needs to confirm the booking first. |
| Loyalties | | Loyalty[] | See below in the Loyalty section |
| Memberships | | Membership[] | See below in the Membership section |
| OrderFemales | | Int >= 0 | Total number of unique female guests. |
| OrderMales | | Int >= 0 | Total number of unique male guests. |
| OrderModifDate | | YYYY-MM-DD | Date of booking modification, in UTC. Do not pass if booking has not been modified. |
| OrderModifTime | | HH:MM:SS | Time of booking creation, in UTC. Do not pass if booking has NOT been modified. If seconds are not provided, set value to ":00". Presence of `OrderModifTime` requires presence of `OrderModifDate`. |
| OrderPets | | Int >= 0 | Number of pets (animals) the guest will bring. |
| OrderSource | | String | Originating source of guest booking, usually a website. For example, Expedia passes bookings from multiple websites (hotels.com, Travelocity, Orbtiz, etc.). May also refer to travel agent/agency who created the booking. Do NOT provide this field if the value is the same as your channel name. This field is informational only. |
| OrderSourceId | | String | This field is used by build-to-us channel brokers (channels that pass us reservations made on one of their partner channels). This field should contain the channel ID you use to identify the third party or the Cloudbeds Channel Manager channel ID (e.g., `exp` for `Expedia`). If you plan to use your channel's third-party channel ids, please provide us with your list of identifiers and their associated channel names so we can internalize them. Cloudbeds will use or translate this to an internal ID so that the end user knows the reservation origin source. For example, if `OrderSource` is `Expedia`, then `OrderSourceId` is the ID used by your channel (or ours) to identify `Expedia`. To use Cloudbeds' channel IDs directly please reach out to us for a current list. **Important**: It is required to use the `ExternalReferences` section to provide us with the corresponding reservation origin `OrderId` when brokering reservations. Make sure `Type` is set to `OTA`. |
| Payments | | Payment[] | See below in the Payment section |
| PaymentCollect | | Enum('Property', 'Channel') | Who collects outstanding balance from the guest? `Property` means that the property takes the payment, either by charging the credit card, or on arrival. `Channel` means that the channel will take the payment, and the property is paid by the channel. Do not set this to `Channel` if you are only collecting the commission/deposit. |
| PaymentTransactions | | PaymentTransaction[] | See below in the PaymentTransaction section |
| Policy | | String | Terms and conditions that apply to this booking. For example it could contain the cancellation terms. |
| SourceTree | | SourceTree[] | A list of reservation sources for brokered reservations. This list always includes an intermediary, such as a channel, CRS, or GDS, and can contain a guest-facing entity, such as a travel agency or rewards program. See more below in SourceTree section |
| TaxBreakdown | | TaxBreakdown[] | See below in the TaxBreakdown section |
| TotalTaxes | | Currency | Amount of taxes for this booking. The amount is included in `TotalPrice`. If there are different types of taxes applicable to a booking then this is the sum of those taxes. |
| TotalTaxesCurrency | | CurrencyCode | Currency code for the `TotalTaxes` field. Required if `TotalTaxes` is present. |
| TravelAgencies | | TravelAgency[] | See below in the TravelAgency section |
| Vouchers | | Voucher[] | See below in the Voucher section |

### Relation of fields

```
TotalPrice = Totals of all rooms + extra services + extra taxes - discounts
           = Total of day rates  + extra services + extra taxes - discounts

Balance    = TotalPrice - Deposit
```

## Room

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| Adults | Yes | Int >= 0 | Number of adults staying in this room. Adult age threshold is defined by the channel. |
| Babies | Yes | Int >= 0 | Number of babies staying in this room. Baby age threshold is defined by the channel. |
| ChannelRoomType | Yes | String | The ID of the room on the channel. |
| Children | Yes | Int >= 0 | Number of children staying in this room. Child age threshold is defined by the channel. |
| Currency | Yes | CurrencyCode | Currency code for the `Price` field. Required if `Price` is present. |
| DayRates | Yes | DayRate[] | See below in the DayRate section. |
| EndDate | Yes | YYYY-MM-DD | The date of the last night of stay (equal to departure date minus one). |
| Occupancy | Yes | Int >= 0 | Total number of persons staying in this room, including children and babies. Should be the sum of `Adults`, `Children` and `Babies` if those are present. |
| Price | Yes | Currency | Total price of the room, for all units and all days, including taxes and fees. Example: stay is for two days and three units and a single night costs €10 (including tax), then `Price` is 2 * 3 * 10 = 60. |
| RateDesc | Yes | String | Description of the booked rate plan, as provided by the channel. |
| RateId | Yes | String | Applicable rate plan ID for this booking. Normally there is only one. If there are multiple, list them comma-separated. |
| StartDate | Yes | YYYY-MM-DD | Arrival date of the customer. |
| Units | Yes | Int > 0 | Number of rooms booked (for private rooms) or number of beds booked (for dorms/shared rooms). |
| Breakfast | | Enum(0,1) | Whether breakfast was booked. |
| ExtraServices | | ExtraService[] | See below in the ExtraService section |
| ExtraTaxes | | ExtraTax[] | See below in the ExtraTax section |
| RoomDesc | | String | Description of the room, as provided by the channel. |
| OccupantFName | | String | First name(s) of the main occupant of this room. If name is not able to be provided separated by first and last name, provide the full name in `OccupantLName` and omit this field. |
| OccupantLName | | String | Last (family) name or full name of the main occupant of this room. |
| OccupantNote | | String | Text provided by the guest at time of booking, intended to be read by the property. |
| OccupantSmoker | | Enum(0,1) | Whether one of the occupants is a smoker. |
| Policy | | String | Text describing the booking conditions, like cancellation conditions. |
| NonRefundableRate | | Boolean | Indicates whether or not the booked rate is non-refundable. |
| PromotionDesc | | String | Describes the promotion applicable to the booked room. |

### Relation of fields

```
Price = sum of day rates + room-specific extra taxes
```

## DayRate

`DayRates` contain as many `DayRate` objects as the number of nights of the room stay. They need to be sorted by date.

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| Currency | Yes | CurrencyCode | Currency code for the `Rate` field. |
| Date | Yes | YYYY-MM-DD | Date of day rate. |
| Description | Yes | String | Name or short description of the rate plan booked. Example: "Non-refundable rate" or "10% festival discount". |
| Rate | Yes | Currency | Price for this day, including `Commission` and `Tax`. |
| RateId | Yes | String | Applicable channel rate plan ID for this day rate. |
| Commission | | Currency | Amount of commission included in the `Rate`. |
| IsRatePerUnit | | Boolean | Whether the rate is per unit. Defaults to `true` if not present. |
| Tax | | Currency | Amount of tax included in the `Rate`. |

## Customer

The first entry in the `Customers` array should refer
to the person that has made the booking, who may not neccessarily be the
person staying at the property.

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| CustomerCountry | Yes | ISO 3166-1 alpha-2 | Country code in which the customer resides, corresponding to their address. Value is uppercase. |
| CustomerEmail | Yes | Email-Address | Email address of the customer. |
| CustomerFName | Yes | String | First name(s) of the customer. If the name is not stored separated by first and last name, provide full name in `CustomerLName`. |
| CustomerLName | Yes | String | Last (family) name or full name of the customer. |
| CustomerAddress | | String | Address of the customer. This usually refers to the street name and house number, apartment name or similar. Multiple address lines should be comma-separated (not with newlines). |
| CustomerAge | | Int >= 0 | Customer age at the time of booking. Use if you *only* store the age, not the birthday. |
| CustomerArrivalTime | | HH:MM | Estimated time of arrival to the property as given by the customer. In the property's timezone. |
| CustomerBirthday | | YYYY-MM-DD | Date of birth of the customer. |
| CustomerCity | | String | City/town/village/locality of the customer. |
| CustomerCompany | | String | Name of the company of the customer. |
| CustomerCompanyDepartment | | String | Name of the department within the company of the customer. Example: "Sales". |
| CustomerDepartureTime | | HH::MM | Estimated time of departure from the property as given by the customer. In the property's timezone. |
| CustomerFax | | String | Pshhhkkkkkkrrrrkakingkakingkakingtshchchchchchchchcch\*ding\*ding\*ding\*. |
| CustomerGender | | Enum(MA,FE,MI) | Gender of the customer. `MA` = male, `FE` = female, `MI` = mixed (multiple customers, or gender neutral). |
| CustomerIP | | IPv4 or IPv6 | IP of the customer. |
| CustomerNationality | | ISO 3166-1 alpha-2 | Country Code of guest birthplace (or Country Code listed on guest passport). Value is uppercase. |
| CustomerNote | | String | Text provided by the guest at time of booking, intended to be read by the property. |
| CustomerPhone | | String | Phone number of the customer. If mobile phone number is provided separately then this is the landline or alternative phone number. |
| CustomerPhoneMobile | | String | Mobile phone number of the customer. |
| CustomerPostCode | | String | Postcode (ZIP) of the customer. |
| CustomerSmoker | | Enum(0,1) | Whether customer is a smoker. |
| CustomerState | | String | State (province, etc.) of the customer. |
| CustomerTitle | | String | Something like "Mr", "Mrs", "Miss", "Herr", "Frau", "Fräulein" |
| MarketingOptIn | | Enum(0,1) | Whether the customer has agreed to receive marketing communications. |

## Discount

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| Currency | Yes | CurrencyCode | Currency code for the `Discount` field. |
| Description | Yes | String | Description of the discount. |
| Discount | Yes | Currency | Amount of discount as a positive value. |
| EndDate | Yes | YYYY-MM-DD | End date for the date range of when this discount is applicable. Often the same as the booking's `EndDate`. |
| StartDate | Yes | YYYY-MM-DD | Start date for the date range of when this discount is applicable. Often the same as the booking's `StartDate`. |
| IncludedInDayRates | | Enum(0,1) | Whether the discount is included in the day rates. If not present assumed to be `1`. |
| IncludedInRoomPrice | | Enum(0,1) | Whether the discount is included in the room price (`Price` in `Rooms` array). If not present assumed to be `1`. |
| IncludedInTotal | | Enum(0,1) | Whether the discount is included in the total. We strongly recommend to set this to `1` whenever possible. |

## ExternalReference

List of further identifiers for the booking. For example, the booking ID a travel
agency or reservation broker provides might be different from the build-to-us channel's booking ID.
If brokering reservations for other online travel agencies, it is required to provide an external
reference object with `Type` `OTA` and the reservation origin order ID as the `Reference`. This way,
if the property needs to get in contact with the reservation source, they know the correct reservation ID.

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| Type | Yes | String | Identifies which system the booking reference refers to (eg. `IATA`, `OTA`, or `CRS`). There is no predefined list for this. |
| Reference | Yes | String | ID on the system referred to by `Type`. |

## ExtraService

Extra services can contain extra fees like breakfasts, extra beds or any other
service booked.

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| EndDate | Yes | YYYY-MM-DD | End date for the date range of when this extra service is applicable. Often the same as the booking's `EndDate`. |
| StartDate | Yes | YYYY-MM-DD | Start date for the date range of when this extra service is applicable. Often the same as the booking's `StartDate`. |
| Units | Yes | Int > 0 | Quantity of the extra services booked. |
| Adults | | Int >= 0 | Number of adults the extra service is booked for. Adult age threshold is defined by the channel. |
| Babies | | Int >= 0 | Number of babies the extra service is booked for. Baby age threshold is defined by the channel. |
| Category | | Enum(...) | What type of extra service is this? Can be `fee`, `meal` or `service`.  |
| Children | | Int >= 0 | Number of children the extra service is booked for. Child age threshold is defined by the channel. |
| Currency | | CurrencyCode | Currency code for the `Price` field. Ideally always present if `Price` is present, but if channel doesn't provide it it's best not to guess it. |
| Label | | String | Short free-form name for the type of extra service (eg. Conference Room ). |
| Description | | String | Description of the extra service. |
| IncludedInDayRates | | Enum(0,1) | Whether the discount is included in the day rates. If not present assumed to be true. |
| IncludedInRoomPrice | | Enum(0,1) | Whether the discount is included in the room price (`Price` in `Rooms` array). If not present assumed to be true. |
| IncludedInTotal | | Enum(0,1) | Whether the extra service is included in the total. Ideally always `1` unless there is a very specific reason not to do that. |
| Price | | Currency | Price of the extra service (price per unit of service, not the total for all `Units`). Some services do not have a price, in which case this can also be left out. |

## ExtraTax

Lists additional taxes that do not fit into the general `Tax` field in the day
rates, because the tax is not related to per-night rates. Per-person rates for
example to do not well into the Room section.

If a tax is specific to a specific room put it in the `Rooms` section.

| Field | Required | Type | Description |
| ----- | ------ | ---- | ----------- |
| Amount | Yes | Float >= 0 | Tax amount used for calculation. Can refer to an absolute value or percentage. If percentage needs to be a value between 0 and 100. |
| AppliesPer | Yes | TaxAppliesPer | What does the tax apply to? E.g. `booking`, `guest`, `room`.  For codes see below in the TaxAppliesPer section. |
| Category | Yes | Enum(...) | What type of tax is it? Can be `authority_fee` or `tax`. |
| Currency | Yes | CurrencyCode | Currency code for the `Amount` and `TotalAmount` field. |
| EndDate | Yes | YYYY-MM-DD | End date for the date range of when this extra tax is applicable. |
| IsInclusive | Yes | Enum(0,1) | Whether the tax is included in the rates provided by the channel. |
| IsPercent | Yes | Enum(0,1) | Whether value in `Amount` refers to a percentage. |
| IsPerNight | Yes | Enum(0,1) | Whether the value in `Amount` applies for each night. Only really matters if `IsPercent` is `0`. |
| StartDate | Yes | YYYY-MM-DD | Start date for the date range of when this extra tax is applicable. |
| TotalAmount | Yes | Currency | Total amount of tax applicable to the booking. The result of applying the rules below to the booking. |
| RemittedBy | | Enum(...) | Who is responsible for remitting this tax to the tax-collecting agency? Can be `Property` or `Channel`. |
| Description | | String | Description of the tax as provided by the channel. |

## SourceTree

Lists chain of reservation sources from guest to Cloudbeds, in that order. Each
source is an object with the following fields:

| Field | Required | Type | Description |
| ----- | ------ | ---- | ----------- |
| Name | Yes | String | Name of source, provided by channel. |
| Type | Yes | String | Open Travel Booking Channel Type. Can be 1-7. Examples: 1 = GDS, 5 = CRS, 7 = Internet (e.g., channel). |
| ExternalId | | String | Reservation broker provided ID for the source. Same type of ID as used in `OrderSourceId`. Please provide Cloudbeds with a list, unless Cloudbeds Channel Manager channel IDs are used. |
| InternalId | | String | Cloudbeds Channel Manager ID for the source if the source already exists within Cloudbeds. Can be the same as `ExternalId` if Cloudbeds Channel Manager channel IDs are used. |

## TaxBreakdown

Provides a breakdown of which taxes are contained in `TotalTaxes`. See
`ExtraTax` section above for the format.

## TaxCategory

If the tax category doesn't fit our existing codes please let us know and we'll
extend them.

* `Resort Tax`
* `Tourism Tax`
* `VAT`

## TaxAppliesPer

* `adult`
* `all-adults`
* `booking`
* `child`
* `children`
* `guest`
* `pet`
* `pets`
* `rateplan`
* `room`
* `room-type`
* `service`

## TravelAgency

This object holds information about involved travel agencies.

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| Address | | String | Address of the travel agency. |
| City | | String | City of the travel agency. |
| CompanyName | | String | Company name. |
| Country | | ISO 3166-1 alpha-2 | Country code of the travel agency. Value is uppercase. |
| Email | | Email-Address | Email address of the travel agency. |
| Fax | | String | Fax number of travel agency. |
| Name | | String | Name of the travel agency. |
| Phone | | String | Phone number of the travel agency. |
| PhoneMobile | | String | Mobile phone number of the travel agency. |
| Phones | | Phone[] | Phone numbers of the travel agency. |
| PostCode | | String | Postcode (ZIP) of the travel agency. |
| ProfileId | | String | Travel agency ID. The ID may come from different sources, see ProfileIdType |
| ProfileIdType | | Enum('ABTA','CLIA','IATA','TIDS','TRUE') | Organization to which the travel agency profile ID belongs. |
| State | | String | State (province, etc.) of the travel agency. |


## Payment

This object holds credit/debit card details of the customer.

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| CardNumber | Yes | String | Credit card number. Should really only contain numbers but spaces are fine too. |
| CardCode | Yes | CardType | See below in the CardType section.  |
| Card3DSecureCAVV | | String | 3D-Secure Authentication Validation Value. Contains the AAV for Mastercard or CAVV for Visa. |
| Card3DSecureCAVVAlgorithm | | String | Algorithm used to generate the CAVV. A single digit or letter. |
| Card3DSecureDSTransactionId | | String | The 3D-Secure Directory Server transaction ID that is used for the 3D Authentication. Mandatory for MasterCard. |
| Card3DSecureECI | | Int >= 0| Electronic Commerce Indicator provides authentication validation results returned. `0` = Non-3D-Secure transaction (no liability shift), `1` = Authentication attempted (MasterCard), `2` = Successful authentication (MasterCard), `5` = Successful authentication (Visa, Diners Club, Amex), `6` = Authentication attempted (Visa, Diners Club, Amex), `7` = Non-3D-Secure transaction (no liability shift) |
| Card3DSecureCardNotPresent | | Boolean | False indicates that 3D-Secure authentication was bypassed because the cardholder information was passed verbally. |
| Card3DSecureVersion | | String | The 3D Secure version used for the authentication. A three part version like so: `1.0.2`, `2.1.0`, `2.2.0`. Mandatory for MasterCard. |
| Card3DSecureXID | | String| The transaction ID that is used for the 3D Authentication. |
| Address |  | CreditCardAddress | See below in the CreditCardAddress section. |
| CardHolderName | | String | Full name of the card holder as it appears on the card. |
| ExpireDate | | MMYY | Credit card expiration month (first two digits) and year (second two digits). Single digit months need a leading zero. |
| SeriesCode | | Int >= 0 | CVV (CV2) number from the back of the credit/debit card. Usually three of four digits. Most properties will need this field to process the card. |
| CardBalance | | Currency | Balance on the card. Usually just for virtual cards. |
| CardBalanceCurrency | | CurrencyCode | Currency of the `CardBalance` field. |
| CardActivationDate | | YYYY-MM-DD | The card can be charged starting on this date. Relates to virtual cards that cannot be charged right away. |
| CardExpirationDate | | YYYY-MM-DD | The card can be charged until on this date. Relates to virtual cards. |
| DayRatesCommissionIncluded | | Boolean | In cases where a reservation is paid for by virtual credit card (VCC), this flag indicates whether or not the rates for each date of stay already has channel commission/compensation subtracted or not. |
| IsBankTransfer | | Boolean | Used to indicate whether or not the reservation was paid for by bank transfer (meant for VCCs). |
| IsVCC | | Boolean | True if the payment card is a virtual credit card (VCC). |
| TaxId | | String | In some regions (like Brazil) a tax ID of the card holder is required to charge a card. |
| TotalPriceCommissionIncluded | | Boolean | In cases where a reservation is paid for by virtual credit card (VCC), this flag indicates whether or not the reservation total price already has channel commission/compensation subtracted or not. |

## CardType

| Code | Name |
| ---- | ---- |
| AX | American Express |
| BC | BC Card |
| CA | MasterCard |
| CB | Carte Blanche |
| CL | Cabal |
| CU | China Union Pay |
| DS | Discover |
| DC | Diners Club |
| E  | Electron |
| EC | EuroCard |
| EL | Elo Creditcard |
| ER | enRoute |
| FB | Forbrugsforeningskort |
| HC | Hipercard |
| IT | ItalCred |
| JA | JAL |
| JC | Japan Credit Bureau |
| L  | Delta |
| LA | Laser |
| MU | Maestro UK |
| N  | Dankort |
| NR | Naranja |
| NT | Nativa |
| R  | Carte Bleue |
| S  | Switch |
| SO | Solo |
| T  | Carta Si |
| TO | Maestro |
| TP | Universal Air Travel Card |
| VI | Visa |

## ContactPerson

Contact person information.

| Field              | Always Present | Type                | Description                                                 |
|--------------------|----------------|---------------------|-------------------------------------------------------------|
| Address            |                | String              | Contact person address.                                     |
| City               |                | String              |                                                             |
| Country            |                | ISO 3166-1 alpha-2  | Country code.                                               |
| Email              |                | Email-Address       | Email address.                                              |
| FName              |                | String              | First name.                                                 |
| LName              |                | String              | Last name.                                                  |
| LoyaltyMemberships |                | LoyaltyMembership[] | Loyalty program memberships assigned to the contact person. |
| Phone              |                | String              | Phone number.                                               |
| PostCode           |                | String              | Postcode (ZIP).                                             |
| State              |                | String              | State (province, etc.). 

## CreditCardAddress

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| AddressLine | | String | Address of the card holder. This usually refers to the street name and house number, apartment name or similar. Multiple lines should be added comma-separated (not with newlines). |
| CityName | | String | City/town/village/locality of the card holder. |
| CountryCode | | ISO 3166-1 alpha-2 | Resident country code of card holder, as part of their address. Value should be uppercase. |
| PostalCode | | String | Postcode (ZIP) of the card holder. |
| StateCode | | String | State (province, etc.) of the card holder. |

## CustomerAssociation

Reservation customers can sometimes be associated with entities that have some
meaning to the property or arrange the reservation. These associations (minus
travel agencies, which are handled separately) include companies (a customer's
company employer may have a special deal with the property enabling different
rates or capabilities that can, for example, trigger during reservation
cancellation), wholesalers, or groups (customer can
book as part of a group block for special events). Each association will have
indicators of type as well as a contact person. Group associations will also
contain a `GroupCode`, which indicates to the property manager the group block
to which they belong.

### Provided by channel module

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| TypeId | Yes | Enum(3,5,6,21) | Refer [Profile Type (PRT)](#profile-type-prt). |
| Address | | String | Address line for association contact person. |
| City | | String | City for association contact person. |
| CompanyName | | String | Company name. |
| ContactPerson | | ContactPerson | Contact person information. |
| Country | | ISO 3166-1 alpha-2 | Country code for association contact person. |
| Email | | Email-Address | Email address for the association contact person. |
| Fax | | String | Fax number for association contact person. |
| GroupCode | | String | Only found in group block associations. Enables property manager to tie reservation back to group block. This value is sent to the channel when creating the block. |
| Name | | String | Name for association contact person. |
| Phone | | String | Phone number for association contact person. |
| PhoneMobile | | String | Mobile phone for the association / contact person. |
| Phones | | Phone[] | Phone numbers for the association / contact person. |
| PostCode | | String | Postal code for association contact person. |
| ProfileId | | String | Unique ID for this association profile. Probably channel-specific. |
| State | | String | State (province, etc.) of the travel agency. |

## Loyalty

Some properties (usually bigger hotel chains) have loyalty programs that
can help guests accumulate monetary perks toward future stays with the
chain. Loyalties form a type of deposit, which go towards the total
reservation price affecting the `Deposit` and `Balance` fields in a
reservation payload. Loyalties have a name, a member ID, quantity, and
total amount.

### Provided by channel module

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| Description | Yes | String | Name of loyalty program. |
| MemberId | Yes | String | Loyalty program member ID (usually an email address). |
| Currency | | CurrencyCode | Currency of the `Total` field. |
| TotalAmount | | Currency | Total amount deposited for the reservation. |
| Units | | String | Number of loyalty points used. |

## LoyaltyMembership

Guests can have membership details for loyalty programs stored in their profile.
Loyalty program details in a guest profile indicate what membership details a customer
has stored on their profile but not which loyalty program is selected for the booking.

| Field         | Required | Type       | Description                                                          |
|---------------|----------|------------|----------------------------------------------------------------------|
| EffectiveDate |          | YYYY-MM-DD | Starting date.                                                       |
| ExpireDate    |          | YYYY-MM-DD | Ending date.                                                         |
| LoyalLevel    |          | String     | Indicates special privileges in a program assigned to an individual. |
| MembershipId  |          | String     | Unique identifier of the member in the program.                      |
| ProgramId     |          | String     | The company of the loyalty program.                                  |
| SignupDate    |          | YYYY-MM-DD | The date that the member signed up for the loyalty program.          |
| VendorCode    |          | String     | The identifier for the vendor in the program.

## Membership

Some properties have "frequent guest" programs that allow for guests to
accrue points or get perks. Each membership will contain a `ProgramCode`
(membership program name) and `AccountID` (guest's membership ID).

### Provided by channel module

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| AccountId | Yes | String | Guest's membership ID for this program |
| ProgramCode | Yes | String | Name of the membership program |
| BonusCode | | String | The code or name of the bonus program. |

## Voucher

Vouchers are a form of deposit. Sometimes, when a guest books as part
of a company, the company may have an account with the property. In
some cases, if one of these customers cancels their reservation booked
through their company, instead of getting a refund, the property keeps
the money in an account and can apply it to future reservations as a
voucher. It is applied towards the total reservation price affecting
the `Deposit` and `Balance` fields in a reservation payload.

### Provided by channel module

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| TotalAmount | Yes | Currency | Total amount deposited for the reservation. |
| VoucherId | Yes | String | The transaction ID. |
| Currency | | CurrencyCode | Currency of the `Total` field. |
| SupplierId | | String | Source/Provider of the voucher. |

## Reference Tables

CRSs refer to OTA codes in different sections of the payload which in turn have designated values.
The below tables documents different codes -> values mappings.

### Profile Type (PRT)

| Code Value | Code Name  |
| ---------- | ---------- |
| 3          | Company    |
| 5          | Wholesaler |
| 6          | Group      |
| 21         | Arranger   |
