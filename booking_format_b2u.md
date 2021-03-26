# Booking Format Documentation

## Root elements

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| Customers | Yes | Customer[] | See below in the Customer section |
| IsCancellation | Yes | Enum(0,1) | `1` if booking is cancelled. |
| IsModification | Yes | Enum(0,1) | `1` if booking is modified. |
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
| CancellationReason | | String | Only provide when `IsCancellation` = `1`. Reason given by property or guest as to why booking was cancelled. |
| Commission | | Currency | Amount of commission on the booking, included in the `TotalPrice`. Commission is an absolute amount of currency to be paid to the channel. This field does not indicate whether the commission is already paid or not. |
| CommissionCurrency | | CurrencyCode | Currency code for the `Commission` field. Required if `Commission` is present. |
| Deposit | | Currency | Amount of deposit this booking has already received. Included in `TotalPrice` |
| DepositCurrency | | CurrencyCode | Currency code for the `Deposit` field. Required if `Deposit` is present. |
| ExternalReferences | | ExternalReference[] | See below in the ExternalReference section |
| ExtraServices | | ExtraService[] | See below in the ExtraService section |
| ExtraTaxes | | ExtraTax[] | See below in the ExtraTax section |
| IsTentative | | Enum(0,1) | `1` if the booking is not yet confirmed and availability should not yet be reduced. This can apply to booking enquiries where the property owner needs to confirm the booking first. |
| OrderAdults | | Int >= 0 | Total number of unique adults. Adult age threshold is defined by the channel. Should equal sum of `Adults` in each room if this breakdown is given. |
| OrderChildren | | Int >= 0 | Total number of unique children or babies. Child/baby age threshold is defined by the channel. Should equal sum of `Children` plus `Babies` in each room if this breakdown is given. |
| OrderCustomers | | Int >= 0 | Total number of unique customers. Should equal sum of `Occupancy` in each room if this breakdown is given. Should also equal the sum of `OrderAdults` and `OrderChildren` if those fields are present. |
| OrderFemales | | Int >= 0 | Total number of unique female guests. |
| OrderMales | | Int >= 0 | Total number of unique male guests. |
| OrderModifDate | | YYYY-MM-DD | Date of booking modification, in UTC. Do not pass if booking has not been modified. |
| OrderModifTime | | HH:MM:SS | Time of booking creation, in UTC. Do not pass if booking has NOT been modified. If seconds are not provided, set value to ":00". Presence of `OrderModifTime` requires presence of `OrderModifDate`. |
| OrderPets | | Int >= 0 | Number of pets (animals) the guest will bring. |
| OrderSource | | String | Originating source of guest booking, usually a website. For example, Expedia passes bookings from multiple websites (hotels.com, Travelocity, Orbtiz, etc.). May also refer to travel agent/agency who created the booking. Do NOT provide this field if the value is the same as your channel name. |
| Payments | | Payment[] | See below in the Payment section |
| PaymentCollect | | Enum('Property', 'Channel') | Who collects outstanding balance from the guest? `Property` means that the property takes the payment, either by charging the credit card, or on arrival. `Channel` means that the channel will take the payment, and the property is paid by the channel. Do not set this to `Channel` if you are only collecting the commission/deposit. |
| PaymentTransactions | | PaymentTransaction[] | See below in the PaymentTransaction section |
| Policy | | String | Terms and conditions that apply to this booking. For example it could contain the cancellation terms. |
| TaxBreakdown | | TaxBreakdown[] | See below in the TaxBreakdown section |
| TotalTaxes | | Currency | Amount of taxes for this booking. The amount is included in `TotalPrice`. If there are different types of taxes applicable to a booking then this is the sum of those taxes. |
| TotalTaxesCurrency | | CurrencyCode | Currency code for the `TotalTaxes` field. Required if `TotalTaxes` is present. |
| TravelAgencies | | TravelAgency[] | See below in the TravelAgency section |

### Relation of fields

```
TotalPrice = Totals of all rooms + extra services + extra taxes - discounts
           = Total of day rates  + extra services + extra taxes - discounts

Balance    = TotalPrice - Deposit
```

## Room

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| ChannelRoomType | Yes | String | The ID of the room on the channel. |
| Currency | Yes | CurrencyCode | Currency code for the `Price` field. Required if `Price` is present. |
| DayRates | Yes | DayRate[] | See below in the DayRate section. |
| EndDate | Yes | YYYY-MM-DD | The date of the last night of stay (equal to departure date minus one). |
| Price | Yes | Currency | Total price of the room, for all units and all days, including taxes and fees. Example: stay is for two days and three units and a single night costs €10 (including tax), then `Price` is 2 * 3 * 10 = 60. |
| StartDate | Yes | YYYY-MM-DD | Arrival date of the customer. |
| Units | Yes | Int > 0 | Number of rooms booked (for private rooms) or number of beds booked (for dorms/shared rooms). |
| Adults | | Int >= 0 | Number of adults staying in this room. Adult age threshold is defined by the channel. |
| Babies | | Int >= 0 | Number of babies staying in this room. Baby age threshold is defined by the channel. |
| Breakfast | | Enum(0,1) | Whether breakfast was booked. |
| Children | | Int >= 0 | Number of children staying in this room. Child age threshold is defined by the channel. |
| ExtraTaxes | | ExtraTax[] | See below in the ExtraTax section |
| RateDesc | | String | Description of the booked rateplan, as provided by the channel. |
| RateId | | String | Applicable rateplan ID for this booking. Normally there is only one. If there are multiple, list them comma-separated. |
| RoomDesc | | String | Description of the room, as provided by the channel. |
| Occupancy | | Int >= 0 | Total number of persons staying in this room, including children and babies. Should be the sum of `Adults`, `Children` and `Babies` if those are present. |
| OccupantFName | | String | First name(s) of the main occupant of this room. If name is not able to be provided separated by first and last name, provide the full name in `OccupantLName` and omit this field. |
| OccupantLName | | String | Last (family) name or full name of the main occupant of this room. |
| OccupantNote | | String | Text provided by the guest at time of booking, intended to be read by the property. |
| OccupantSmoker | | Enum(0,1) | Whether one of the occupants is a smoker. |
| Policy | | String | Text describing the booking conditions, like cancellation conditions. |
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
| Description | Yes | String | Name or short description of the rateplan booked. Example: "Non-refundable rate" or "10% festival discount". |
| Rate | Yes | Currency | Price for this day, including `Commission` and `Tax`. |
| Commission | | Currency | Amount of commission included in the `Rate`. |
| RateId | | String | Applicable rateplan ID for this day rate. If you support rateplans this is a required field. |
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

## ExternalReference

List of further identifiers for the booking. For example, the booking ID a travel
agency provides might be different from the channel's booking ID.

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| Type | Yes | String | Identifies which system the booking reference refers to (eg. `IATA` or `CRS`). There is no predefined list for this. |
| Reference | Yes | String | ID on the system referred to by `Type`. |

## ExtraService

Extra services can contain extra fees like breakfasts, extra beds or any other
service booked.

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| Label | | String | Short free-form name for the type of extra service (eg. Conference Room ). |
| Description | Yes | String | Description of the extra service. |
| EndDate | Yes | YYYY-MM-DD | End date for the date range of when this extra service is applicable. Often the same as the booking's `EndDate`. |
| StartDate | Yes | YYYY-MM-DD | Start date for the date range of when this extra service is applicable. Often the same as the booking's `StartDate`. |
| Units | Yes | Int > 0 | Quantity of the extra services booked. |
| Currency | | CurrencyCode | Currency code for the `Price` field. Required if `Price` is present. |
| Price | | Currency | Price of the extra service. Some services do not have a price. |

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
| IsPercent | Yes | Enum(0,1) | Whether value in `Amount` refers to a percentage. |
| IsPerNight | Yes | Enum(0,1) | Whether the value in `Amount` applies for each night. Only really matters if `IsPercent` is `0`. |
| StartDate | Yes | YYYY-MM-DD | Start date for the date range of when this extra tax is applicable. |
| TotalAmount | Yes | Currency | Total amount of tax applicable to the booking. The result of applying the rules below to the booking. |
| RemittedBy | | Enum(...) | Who is responsible for remitting this tax to the tax-collecting agency? Can be `Property` or `Channel`. |
| Description | | String | Description of the tax as provided by the channel. |

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
| Name | | String | Name of the travel agency. |
| Phone | | String | Phone number of the travel agency. |
| Email | | Email-Address | Email address of the travel agency. |
| Address | | String | Address of the travel agency. |
| City | | String | City of the travel agency. |
| PostCode | | String | Postcode (ZIP) of the travel agency. |
| State | | String | State (province, etc.) of the travel agency. |
| Country | | ISO 3166-1 alpha-2 | Country code of the travel agency. Value is uppercase. |

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

## CardType

| Code | Name |
| ---- | ---- |
| AX | American Express |
| BC | BC Card |
| CA | MasterCard |
| CB | Carte Blanche |
| CU | China Union Pay |
| DS | Discover |
| DC | Diners Club |
| E  | Electron |
| EC | EuroCard |
| EL | Elo Creditcard |
| ER | enRoute |
| HC | Hipercard |
| JA | JAL |
| JC | Japan Credit Bureau |
| L  | Delta |
| LA | Laser |
| MU | Maestro UK |
| N  | Dankort |
| R  | Carte Bleue |
| S  | Switch |
| SO | Solo |
| T  | Carta Si |
| TO | Maestro |
| TP | Universal Air Travel Card |
| VI | Visa |

## CreditCardAddress

| Field | Required | Type | Description |
| ----- | -------- | ---- | ----------- |
| AddressLine | | String | Address of the card holder. This usually refers to the street name and house number, apartment name or similar. Multiple lines should be added comma-separated (not with newlines). |
| CityName | | String | City/town/village/locality of the card holder. |
| CountryCode | | ISO 3166-1 alpha-2 | Resident country code of card holder, as part of their address. Value should be uppercase. |
| PostalCode | | String | Postcode (ZIP) of the card holder. |
| StateCode | | String | State (province, etc.) of the card holder. |
