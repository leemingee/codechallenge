round.numerics <- function(x, digits = 0, nearest = 1){
  if(is.numeric(x)){
    return(nearest * round(x = x/nearest, digits = digits))
  }
  else{
    return(x)
  }
}