# Jory's Calculator

**Yea**

_Created using [Play Framework](https://www.playframework.com/) & [Scala](https://www.scala-lang.org/) and hosted with the help of [Docker](https://www.docker.com/)_

***

## Running Locally

Run this using [sbt](http://www.scala-sbt.org/):

```
sbt run
```

Access the web application at http://localhost:9000.


This script can also be added to IntelliJ as an **SBT Task** in the **Run/Debug Configurations**.


To speed up your development process you can use `sbt ~run` which recompiles and reruns after any change to a source file. And to automatically reload the web browser, the Chrome extension [Play Framework Tools](https://chrome.google.com/webstore/detail/play-framework-tools/dchhggpgbommpcjpogaploblnpldbmen) can be used.

To run a production-like version, use `sbt testProd`.

If running into unexplainable **sbt** errors, try `sbt clean`.

***

## Running Locally with Docker

To run this locally using Docker on a Mac, use [Docker Community Edition for Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac)

Create a Docker image using:

```
sbt docker:publishLocal
```

Check that the image has been published locally using `docker images` and note the version number under the **TAG** column for the (latest) _jorys-calculator_ image.

Then use the following command to run the application using Docker:

```
docker run -p 9000:9000 jorys-calculator:{TAG VERSION NUMBER}
```

Replace the curly braces with the version number noted in the **TAG** column before. The **-p** parameter designates the external port and internal port. Add the **-d** parameter to run in the background. **Example**: `docker run -d -p 80:9000 jorys-calculator:1.01`

***

