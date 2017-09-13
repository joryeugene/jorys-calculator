package controllers

import javax.inject._

import controllers.HomeController.EXPRESSIONS
import play.api.libs.concurrent.Promise
import play.api.libs.iteratee.{Enumerator, Iteratee}
import play.api.libs.json.{JsValue, Json}
import play.api.mvc._

import scala.collection.mutable
import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class HomeController @Inject() extends Controller {

  def index = Action {
    Ok(views.html.index())
  }

  def persistExpression(expression: String) = Action {
    expression +=: EXPRESSIONS
    Ok("Good")
  }

  def getExpressions = WebSocket.using[JsValue] { request =>
    val outEnumerator: Enumerator[JsValue] =
      Enumerator.repeatM(Promise.timeout(getEx, 1000))
    val inIteratee: Iteratee[JsValue, Unit] = Iteratee.ignore[JsValue]

    (inIteratee, outEnumerator)
  }

  private def getEx = {
    val size: Int = EXPRESSIONS.size

    if (size > 10) {
      for (i <- 10 to size - 1) {
        EXPRESSIONS.remove(i)
      }
    }

    Json.toJson(EXPRESSIONS.toList)
  }
}

object HomeController {
  val EXPRESSIONS: mutable.ListBuffer[String] = mutable.ListBuffer.empty[String]
}
