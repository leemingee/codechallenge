packages.used=c("data.table",
                "ggplot2",
                "dplyr", 
                "plyr",
                "Hmisc",
                "lubridate",
                "shiny",
                "DT",
                "leaflet",
                "MASS",
                "rgdal", 
                "caret",
                "ddalpha",
                "glmnet")

# check packages that need to be installed.
packages.needed=setdiff(packages.used, 
                        intersect(installed.packages()[,1], 
                                  packages.used))
# install additional packages
if(length(packages.needed)>0){
  install.packages(packages.needed, dependencies = TRUE)
}

# load packages
library(data.table)
library(ggplot2)
library(plyr)
# library(dplyr)
library(lubridate)
library(shiny)
library(DT)
library(Hmisc)
library(leaflet)
# install.packages("caret",
#                  repos = "http://cran.r-project.org", 
#                  dependencies = c("Depends", "Imports", "Suggests"))
# install.packages("caret", dependencies = TRUE)
library(caret)
library(glmnet)

data <- fread("shiny.csv", stringsAsFactors = F)
data <- data[, -1]
data <- data[-which(data$Pickup_longitude == 0),]
data <- data[-which(data$Dropoff_longitude == 0),]
# data <- data[-which(data$Pickup_latitude == 0),]
# data <- data[-which(data$Dropoff_latitude == 0),]
unique.passenger.count <- unique(data$Passenger_count)
from.pool <- unique(data$County_Pickup)
to.pool <- unique(data$County_Dropoff)
end.time.pool <- unique(data$hour.dropoff.class)
begin.time.pool <- unique(data$hour.pickup.class)
unique.payment <- unique(data$Payment_type)

min.longtitude <- min(data$Pickup_longitude, data$Dropoff_longitude)
max.longtitude <- max(data$Pickup_longitude, data$Dropoff_longitude)

min.latitude <- min(data$Pickup_latitude, data$Dropoff_latitude)
max.latitude <- max(data$Pickup_latitude, data$Dropoff_latitude)

