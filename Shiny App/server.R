server <- function(input, output){
  
  ## Introduction page
  output$blankspace = renderUI({
    HTML("<br/><br/><br/><br/><br/><br/><br/><br/>")
  })
  output$Introduction = renderUI({
    HTML("<br/><br/><br/>A Shiny App writen with R by Ming Li <br/>
to present a visualization and insights<br/>
         for the NYC green taxi trips record<br/><br/><br/><br/>")
  })
  output$teammates <- renderUI({
    HTML("Ming Li, ming.li2@columbia")
  })
  output$thanks <- renderUI({
    HTML("<br/><br/>Thanks for Capital One Recruiter for giving the opportunity <br/> to get hands on this interesting and informative data<br/><br/><br/><br/>Speicial thanks to the 27 inch monitor provided <br/>at Columbia University NWC building")
  })
  
  ## initialization of Ming's Shiny app

    
    colorpalette <- reactive({
      colorNumeric('Spectral',data$Trip_distance)
    })
    
  
    output$map <- renderLeaflet({
      
      tmp <- data
      
      tmp <- subset(tmp, 
                    hour.dropoff.class == input$dropoff.time &
                    hour.pickup.class == input$pickup.time &
                    Payment_type %in% input$payment_type &
                    County_Pickup %in% input$pickup.location &
                    County_Dropoff %in% input$dropoff.location &
                    Fare_amount <= input$range_fare
                    )
      
      p <-  leaflet(tmp)
      p <- addTiles(p)
      p <- addCircleMarkers(p, ~ Pickup_longitude, ~ Pickup_latitude, radius = 0.5, color = "#888888")
      p <- addCircleMarkers(p, ~ Dropoff_longitude, ~ Dropoff_latitude, radius = 0.5, color = "#2ECC71")
      p <- fitBounds(p, -74.20613, 40.5579, -73.54598, 40.92783)
      p
    })
    
    
  
  ## end 2D global page
  ## ===============================
  
  
}