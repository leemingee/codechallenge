# this is a functional packaged for print out the linear or logistic regression summary
# input the dataset, the formula
# output the summary
linear.regression.summary <- function(lm.mod, digits = 3) {
  library(data.table)
  lm.coefs <- as.data.table(summary(lm.mod)$coefficients, 
                            keep.rownames = TRUE)
  alpha = 0.05
  z <- qnorm(p = 1 - alpha/2, mean = 0, sd = 1)
  lm.coefs[, `:=`(Coef.Lower.95, Estimate - z * `Std. Error`)]
  lm.coefs[, `:=`(Coef.Upper.95, Estimate + z * `Std. Error`)]
  return(lm.coefs)
}

logistic.regression.summary <- function(glm.mod, digits = 3) {
  library(data.table)
  glm.coefs <- as.data.table(summary(glm.mod)$coefficients, 
                             keep.rownames = TRUE)
  alpha = 0.05
  z <- qnorm(p = 1 - alpha/2, mean = 0, sd = 1)
  glm.coefs[, `:=`(Odds.Ratio, exp(Estimate))]
  glm.coefs[, `:=`(OR.Lower.95, exp(Estimate - z * `Std. Error`))]
  glm.coefs[, `:=`(OR.Upper.95, exp(Estimate + z * `Std. Error`))]
  return(glm.coefs[])
}


fit.model <- function(dat, the.formula, digits = 3) {
  library(data.table)
  dat <- as.data.table(dat)
  the.outcome <- trimws(strsplit(x = the.formula, split = "~", 
                                 fixed = TRUE)[[1]][1])
  unique.values <- dat[, unique(get(the.outcome))]
  unique.values <- unique.values[!is.na(unique.values)]
  if (length(unique.values) == 2) {
    mod <- glm(formula = the.formula, family = "binomial", 
               data = dat)
    mod.summary <- logistic.regression.summary(glm.mod = mod, 
                                               digits = digits)
  } else {
    mod <- lm(formula = the.formula, data = dat)
    mod.summary <- linear.regression.summary(lm.mod = mod, 
                                             digits = digits)
  }
  mod.summary.rounded <- mod.summary[, lapply(X = .SD, 
                                              FUN = "round.numerics", digits = digits)]
  return(mod.summary.rounded)
}

