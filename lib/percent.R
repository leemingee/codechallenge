# this small piece is used for convert float number x to percentage displayed number
# input: x, digits = 2
# output: "100*x%" character

percent <- function(x, digits = 2, format = "f", ...) {
  paste(formatC(100 * x, format = format, digits = digits, 
                ...), "%", sep = "")
}