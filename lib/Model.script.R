# perform regression on the "cleaned" data
# (The only variable you need to load to the environment is "cleaned")
# As we have many categorical variables with some of them having more than two categories,
# we do selection manually instead of using automatical selection functions

#### Step one: including one variable in the model and extract their F-statistic ###
v_p <- rep(0, 10)
## fare_amount
model1 <- lm(cleaned$tip.fare.percent~cleaned$Fare_amount)
s1 <- summary(model1)
f1 <- s1$fstatistic
v_p[1] <- pf(f1[1],f1[2],f1[3],lower.tail=FALSE)

## RateCodeID
dummies2 <- data.frame(model.matrix(~factor(RateCodeID), data = cleaned))
model2 <- lm(cleaned$tip.fare.percent~dummies2$factor.RateCodeID.2 + dummies2$factor.RateCodeID.3
             + dummies2$factor.RateCodeID.4 + dummies2$factor.RateCodeID.5)
s2 <- summary(model2)
f2 <- s2$fstatistic
v_p[2] <- pf(f2[1],f2[2],f2[3],lower.tail=FALSE)

## Store_and_fwd_flag
dummies3 <- data.frame(model.matrix(~factor(Store_and_fwd_flag), data = cleaned))
model3 <- lm(cleaned$tip.fare.percent~dummies3$factor.Store_and_fwd_flag.1)
s3 <- summary(model3)
f3 <- s3$fstatistic
v_p[3] <- pf(f3[1],f3[2],f3[3],lower.tail=FALSE)

## Trip_type
dummies4 <- data.frame(model.matrix(~factor(Trip_type), data = cleaned))
model4 <- lm(cleaned$tip.fare.percent~dummies4$factor.Trip_type.2)
s4 <- summary(model4)
f4 <- s4$fstatistic
v_p[4] <- pf(f4[1],f4[2],f4[3],lower.tail=FALSE)

## County_Pickup
dummies5 <- data.frame(model.matrix(~factor(County_Pickup), data = cleaned))
model5 <- lm(cleaned$tip.fare.percent~dummies5$factor.County_Pickup.2+dummies5$factor.County_Pickup.3
             +dummies5$factor.County_Pickup.4 + dummies5$factor.County_Pickup.5)
s5 <- summary(model5)
f5 <- s5$fstatistic
v_p[5] <- pf(f5[1],f5[2],f5[3],lower.tail=FALSE)

## County_Dropoff
dummies6 <- data.frame(model.matrix(~factor(County_Dropoff), data = cleaned))
model6 <- lm(cleaned$tip.fare.percent~dummies6$factor.County_Dropoff.2+dummies6$factor.County_Dropoff.3
             +dummies6$factor.County_Dropoff.4 + dummies6$factor.County_Dropoff.5)
s6 <- summary(model6)
f6 <- s6$fstatistic
v_p[6] <- pf(f6[1],f6[2],f6[3],lower.tail=FALSE)

## passenger_bracket
dummies7 <- data.frame(model.matrix(~factor(passenger_bracket), data = cleaned))
model7 <- lm(cleaned$tip.fare.percent~dummies7$factor.passenger_bracket.2+dummies7$factor.passenger_bracket.3
             +dummies7$factor.passenger_bracket.4)
s7 <- summary(model7)
f7 <- s7$fstatistic
v_p[7] <- pf(f7[1],f7[2],f7[3],lower.tail=FALSE)

## distance_bracket
dummies8 <- data.frame(model.matrix(~factor(distance_bracket), data = cleaned))
model8 <- lm(cleaned$tip.fare.percent~dummies8$factor.distance_bracket.2+dummies8$factor.distance_bracket.3
             +dummies8$factor.distance_bracket.4+ dummies8$factor.distance_bracket.5)
s8 <- summary(model8)
f8 <- s8$fstatistic
v_p[8] <- pf(f8[1],f8[2],f8[3],lower.tail=FALSE)

## hour.pickup.class
dummies9 <- data.frame(model.matrix(~factor(hour.pickup.class), data = cleaned))
model9 <- lm(cleaned$tip.fare.percent~dummies9$factor.hour.pickup.class.2+dummies9$factor.hour.pickup.class.3)
s9 <- summary(model9)
f9 <- s9$fstatistic
v_p[9] <- pf(f9[1],f9[2],f9[3],lower.tail=FALSE)

## hour.dropoff.class
dummies10 <- data.frame(model.matrix(~factor(hour.dropoff.class), data = cleaned))
model10 <- lm(cleaned$tip.fare.percent~dummies10$factor.hour.dropoff.class.2+dummies10$factor.hour.dropoff.class.3)
s10 <- summary(model10)
f10 <- s10$fstatistic
v_p[10] <- pf(f10[1],f10[2],f10[3],lower.tail=FALSE)

## Let's see v_p and choose those with smallest p_value into our model
v_p

## The picked variables are model1, 2, 4, 5, 6, 8, 
## whose correspondent variables are Fare_amount, RateCodeID, Trip_type, County_Pickup, County_Dropoff, distance_bracket

## The p-value of F-test for these six variables are all very small
## Howeve, by common sense, the tips are related most directly to the fare_amount
## So we select fare_amount as our first variables included in the model


#### Step two: including one more variable in the model and extract their F-statistic ####
library(lmtest)
v_p2 <- rep(0, 5)
## Fare_amount + RateCodeID
model11 <- lm(cleaned$tip.fare.percent~ cleaned$Fare_amount + dummies2$factor.RateCodeID.2 
              + dummies2$factor.RateCodeID.3 + dummies2$factor.RateCodeID.4 + dummies2$factor.RateCodeID.5)
## delete insignificant level factor.RateCodeID.3
model12<- lm(cleaned$tip.fare.percent~ cleaned$Fare_amount + dummies2$factor.RateCodeID.2 
             dummies2$factor.RateCodeID.4 + dummies2$factor.RateCodeID.5)
v_p2[1] <- waldtest(model1, model12)[[4]][2]

## Fare_amount + Trip_type
model13 <- lm(cleaned$tip.fare.percent~ cleaned$Fare_amount + dummies4$factor.Trip_type.2)
v_p2[2] <- waldtest(model1, model13)[[4]][2]

## Fare_amount + County_Pickup
model14 <- lm(cleaned$tip.fare.percent~ cleaned$Fare_amount+ dummies5$factor.County_Pickup.2
              +dummies5$factor.County_Pickup.3
              +dummies5$factor.County_Pickup.4 + dummies5$factor.County_Pickup.5)
## delete insignificant level factor.County_Pickup.5
model15 <- lm(cleaned$tip.fare.percent~ cleaned$Fare_amount+ dummies5$factor.County_Pickup.2
              +dummies5$factor.County_Pickup.3 +dummies5$factor.County_Pickup.4)
v_p2[3] <- waldtest(model1, model15)[[4]][2]

## Fare_amount + County_Dropoff
model16 <- lm(cleaned$tip.fare.percent~ cleaned$Fare_amount+ dummies6$factor.County_Dropoff.2
              +dummies6$factor.County_Dropoff.3
              +dummies6$factor.County_Dropoff.4 + dummies6$factor.County_Dropoff.5)
v_p2[4] <- waldtest(model1, model16)[[4]][2]

## Fare_amount + distance_bracket
model17 <- lm(cleaned$tip.fare.percent~ cleaned$Fare_amount+dummies8$factor.distance_bracket.2
              +dummies8$factor.distance_bracket.3
              +dummies8$factor.distance_bracket.4+ dummies8$factor.distance_bracket.5)
v_p2[5] <- waldtest(model1, model17)[[4]][2]

## show the p-value for wald-test
## (wald-test is used to test the significance of the added variables)
v_p2

## This shows that all the variables are significant. 
## Therefore, we include all of them into our model and perform backward selection

model18 <- lm(cleaned$tip.fare.percent~ cleaned$Fare_amount
              + dummies2$factor.RateCodeID.2 + dummies2$factor.RateCodeID.4 + dummies2$factor.RateCodeID.5  
              + dummies4$factor.Trip_type.2
              + dummies5$factor.County_Pickup.2+dummies5$factor.County_Pickup.3 +dummies5$factor.County_Pickup.4
              + dummies6$factor.County_Dropoff.2+dummies6$factor.County_Dropoff.3+dummies6$factor.County_Dropoff.4 + dummies6$factor.County_Dropoff.5
              +dummies8$factor.distance_bracket.2+dummies8$factor.distance_bracket.3+dummies8$factor.distance_bracket.4+ dummies8$factor.distance_bracket.5)

# Drop insignificant variables factor.Trip_type.2, factor.County_Dropoff.2

model19 <- lm(cleaned$tip.fare.percent~ cleaned$Fare_amount
              + dummies2$factor.RateCodeID.2 + dummies2$factor.RateCodeID.4 + dummies2$factor.RateCodeID.5  
              + dummies5$factor.County_Pickup.2+dummies5$factor.County_Pickup.3 +dummies5$factor.County_Pickup.4
              + dummies6$factor.County_Dropoff.3+dummies6$factor.County_Dropoff.4 + dummies6$factor.County_Dropoff.5
              + dummies8$factor.distance_bracket.2+dummies8$factor.distance_bracket.3+dummies8$factor.distance_bracket.4+ dummies8$factor.distance_bracket.5)

############################################

mydata <- data.frame(cbind(cleaned$tip.fare.percent,cleaned$Fare_amount
                 , dummies2$factor.RateCodeID.2 , dummies2$factor.RateCodeID.4 , dummies2$factor.RateCodeID.5  
                 , dummies5$factor.County_Pickup.2,dummies5$factor.County_Pickup.3 ,dummies5$factor.County_Pickup.4
                 , dummies6$factor.County_Dropoff.3,dummies6$factor.County_Dropoff.4 , dummies6$factor.County_Dropoff.5
                 , dummies8$factor.distance_bracket.2,dummies8$factor.distance_bracket.3,dummies8$factor.distance_bracket.4, dummies8$factor.distance_bracket.5))
# Do cross validation to check the model
library(DAAG)
temp <- cv.lm(data = mydata, form.lm = formula(X1~X2+X3+X4+X5+X6+X7+X8+X9+X10+X11+X12+X13+X14+X15))
