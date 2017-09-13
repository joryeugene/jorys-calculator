name := "jorys-calculator"

version := "1.00"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

enablePlugins(DockerPlugin)

scalaVersion := "2.11.11"

libraryDependencies += ws
libraryDependencies += filters
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "2.0.0" % Test

pipelineStages := Seq(rjs, digest)

javaOptions in Universal ++= Seq(
  "-Dpidfile.path=/dev/null"
)
