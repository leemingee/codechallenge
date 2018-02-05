ui<- navbarPage(
  
  ##link to css.file
  theme = "bootstrap2.css", 
  
  
  ##Project Title
  "NYC Green Taxi",
  
  tabPanel("Home",
           htmlOutput("blankspace"),
           titlePanel("NYC Green Taxi Insights"),
           h4(htmlOutput("Introduction")),
           h4(htmlOutput("teammates")),
           h4(htmlOutput("thanks"))
  ),
  
  tabPanel("2D Map",
           titlePanel("Visualization"),
           
           leafletOutput("map",width = "100%", height = 600),
           
           absolutePanel(id = "controls", class = "panel panel-default", fixed = TRUE,
                         draggable = TRUE, 
                         top = 180, left = 60, right = "auto", bottom = "auto",
                         width = 350, height = "auto",
                         
                         h2("2D Explorer"),
                         
                         selectInput(inputId = "pickup.location",
                                     label  = "Choose pickup location",
                                     choices = from.pool,
                                     selected =from.pool[1],
                                     multiple = TRUE),
                         
                         selectInput(inputId = "dropoff.location",
                                     label  = "Choose dropoff location",
                                     choices = to.pool,
                                     selected =to.pool[1],
                                     multiple = TRUE),
                         
                         sliderInput(inputId = "passenger",
                                     label = "Select Passenger Count",
                                     value = 3, min =1, max =9),
                         
                         selectInput(inputId = "pickup.time",
                                     label  = "Choose dropoff time range",
                                     choices = begin.time.pool,
                                     selected =begin.time.pool[2],
                                     multiple = F),
                         
                         selectInput(inputId = "dropoff.time",
                                     label  = "Choose dropoff time range",
                                     choices = end.time.pool,
                                     selected =end.time.pool[2],
                                     multiple = F),
                         
                         sliderInput("range_fare",label = "Fare Amount",
                                     value = quantile(data$Fare_amount, 0.5), 
                                     min = min(data$Fare_amount), 
                                     max = max(data$Fare_amount), 
                                     pre = '$'),
                         
                         checkboxGroupInput("payment_type",label = "Payment Mode",
                                            choices = list("Credit Card"=1, "Cash"=2),
                                            selected = c(1,2))
                         
           )
  )
  

  ## end 2D Map tab
  ## fitted new data, this panel works, 20171201
)