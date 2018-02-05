load("013120181645.Rdata")
library(data.table)
library(rgdal)
library(lubridate)

green <- subset(green,
                lpep_pickup_datetime != Lpep_dropoff_datetime &
                  Fare_amount > 0 &
                  day(lpep_pickup_datetime) == 4)
sharp.nyc <- readOGR("ZillowNeighborhoods-NY.shp", layer="ZillowNeighborhoods-NY")
classifier = sharp.nyc[sharp.nyc$City == 'New York', ]
Location_Data_Pickup <- data.frame(Longitude = green$Pickup_longitude, 
                                   Latitude = green$Pickup_latitude)
Location_Data_Dropoff <- data.frame(Longitude = green$Dropoff_longitude, 
                                    Latitude = green$Dropoff_latitude)
# Identify the pickup borough
coordinates(Location_Data_Pickup) <- ~ Longitude + Latitude
proj4string(Location_Data_Pickup) <- proj4string(classifier)
County_Pickup = as.character(over(Location_Data_Pickup, classifier)$County)
# Identify the dropoff borough
coordinates(Location_Data_Dropoff) <- ~ Longitude + Latitude
proj4string(Location_Data_Dropoff) <- proj4string(classifier)
County_Dropoff = as.character(over(Location_Data_Dropoff, classifier)$County)
green$County_Pickup = County_Pickup
green$County_Dropoff = County_Dropoff
# this code block is from Weiye Deng, www.github.com/dwy904
green <- na.omit(green)

hours.replace <- c(rep("midnight", 5), rep("normal", 2), rep("rush", 2), rep("normal", 3), rep("rush", 2), rep("normal", 3), rep("rush", 2), rep("normal", 4), "midnight")

green[, `:=`(hour.pickup, mapvalues(x = lpep_pickup_datetime, 
                                            from = lpep_pickup_datetime, 
                                            to = hour(lpep_pickup_datetime),
                                            warn_missing = FALSE))]
green[, `:=`(hour.dropoff, mapvalues(x = Lpep_dropoff_datetime, 
                                             from = Lpep_dropoff_datetime, 
                                             to = hour(Lpep_dropoff_datetime),
                                             warn_missing = FALSE))]

green[, `:=`(hour.pickup.class, mapvalues(x = hour.pickup, from = as.character(c(0:23)), to = hours.replace))]
green[, `:=`(hour.dropoff.class, mapvalues(x = hour.dropoff, from = as.character(c(0:23)), to = hours.replace))]

names(green)

library(dplyr)
green.shiny <- green %>% select(Fare_amount, Trip_distance, Fare_amount,
                          Passenger_count, Total_amount,
                          Payment_type, County_Dropoff, County_Pickup,
                          hour.pickup.class, hour.dropoff.class, RateCodeID)
names(green.shiny)

write.csv(green.shiny, "shiny.csv")

