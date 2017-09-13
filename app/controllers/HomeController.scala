package controllers

import javax.inject._

import controllers.HomeController.EXPRESSIONS
import play.api.libs.json.Json
import play.api.mvc._

import scala.collection.mutable

@Singleton
class HomeController @Inject() extends Controller {

  def index = Action {
    Ok(views.html.index())
  }

  def persistExpression(expression: String) = Action {
    expression +=: EXPRESSIONS
    Ok("Good")
  }

  def getExpressions() = Action {
    val size: Int = EXPRESSIONS.size

    if (size > 10) {
      for (i <- 10 to size - 1) {
        EXPRESSIONS.remove(i)
      }
    }

    Ok(Json.toJson(EXPRESSIONS.toList))
  }
}

object HomeController {
  val EXPRESSIONS: mutable.ListBuffer[String] = mutable.ListBuffer.empty[String]
}
