packages.used=c("data.table",
                "ggplot2",
                "dplyr", 
                "plyr",
                "Hmisc",
                "tidytext",
                "tm",
                "readxl",
                "wordcloud",
                "prettydoc",
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
library(tidytext)
library(tm)
library(readxl)
library(wordcloud)
library(lubridate)
library(shiny)
library(prettydoc)
library(DT)
library(Hmisc)
library(leaflet)
library(MASS)
library(rgdal)
# install.packages("caret",
#                  repos = "http://cran.r-project.org", 
#                  dependencies = c("Depends", "Imports", "Suggests"))
# install.packages("caret", dependencies = TRUE)
library(caret)
library(glmnet)
