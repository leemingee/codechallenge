source("lib/initial.playground.R")
load(file ="Data/013120181600.RData")

mean_missing <- function(x) {
  return(sum(x = is.na(x)))
}
datatable(t(green[, lapply(X = .SD, FUN = "mean_missing")]))
green <- green[, -'Ehail_fee']

# check the VendorID
table(green$VendorID)
# check the RateCodeID
table(green$RateCodeID)
# check the store_and_fwd_flag
table(green$Store_and_fwd_flag)
# check the payment type
table(green$Payment_type)
# check the trip_type
table(green$Trip_type)

datatable(
  green[which(green$RateCodeID == 99), ]
)
green <- green[-which(green$RateCodeID == 99), ]
# check the passenger count
table(green$Passenger_count)
sum(green$Passenger_count == 0)/nrow(green)
green <- green[-which(green$Passenger_count == 0), ]
sum(green$Trip_distance <= 0)
# check the distance less than 0 && the total amount less than 0
nrow(green[which(green$Total_amount <= 0 & green$Trip_distance <= 0)])
green <- green[-which(green$Total_amount <= 0 & green$Trip_distance <= 0), ]
cat(sum(green$Total_amount < 0),
    sum(green$Tip_amount < 0),
    sum(green$Fare_amount < 0),
    sum(green$Extra < 0),
    sum(green$MTA_tax < 0),
    sum(green$Tolls_amount < 0),
    sum(green$improvement_surcharge < 0), "\n")
summary(green$Fare_amount[which(green$Fare_amount < 0)])

green$MTA_tax[which(green$MTA_tax < 0)] <- 0.5
green$Extra[which(green$Extra < 0 & (
  (hour(green$lpep_pickup_datetime) > 7 & hour(green$lpep_pickup_datetime) < 9) |
    (hour(green$lpep_pickup_datetime) > 16 & hour(green$lpep_pickup_datetime) < 18)))] <- 1
green$Extra[which(green$Extra < 0)] <- 0.5
green$improvement_surcharge[which(green$improvement_surcharge < 0)] <- 0.3
green$Tolls_amount[which(green$Tolls_amount < 0)]
green$Tolls_amount[which(green$Tolls_amount < 0)] <- abs(green$Tolls_amount[which(green$Tolls_amount < 0)])

# deleting the meaningless records
green <- green[-which(green$Trip_distance == 0 & green$Fare_amount <= 0)]
green <- green[-which(green$Trip_distance == 0 & green$Tip_amount <= 0)]
# abs the fare_amount
green[Fare_amount < 0, 'Fare_amount'] <- abs(green[Fare_amount < 0, 'Fare_amount'])
green[Tip_amount < 0, 'Tip_amount'] <- abs(green[Tip_amount < 0, 'Tip_amount'])
# recalulate the total amount again.
green[, 'Total_amount'] <- sum(green[, seq(12:18)], na.rm = T)

# cat(sum(green$Total_amount <= 0),
#     sum(green$Tip_amount < 0),
#     sum(green$Fare_amount < 0),
#     sum(green$Extra < 0),
#     sum(green$MTA_tax < 0),
#     sum(green$Tolls_amount < 0),
#     sum(green$improvement_surcharge < 0))

# table(month(green$Lpep_dropoff_datetime))
# sum(day(green$lpep_pickup_datetime)==31)

cat(unique(floor(green$Pickup_longitude)), "\n",
    unique(floor(green$Pickup_latitude)), "\n",
    unique(floor(green$Dropoff_latitude)), "\n",
    unique(floor(green$Dropoff_longitude)), "\n")

cat(sum(floor(green$Pickup_longitude) == 0),
    sum(floor(green$Pickup_latitude) == 0),
    sum(floor(green$Dropoff_latitude) == 0),
    sum(floor(green$Dropoff_longitude) == 0))

save.image("/Data/013120181645.Rdata")