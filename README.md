# Jory's Calculator

**The Challenge:**

Create a calculator website which logs calculations as
they happen and shares those calculations with everyone connected
to the website. For example, user A and user B go to your site at
the same time. User A calculates "5 + 5", which equals "10". 
This is logged below the calculator as "5 + 5 = 10". 
User B is updated about this calculation right after user A posts it. 
Now user B calculates "3 * 4". This calcs to 12 and displays "3 * 4 = 12"
right above the prior calculation. User A sees this update immediately after user 
B posts it. Results should remain between sessions. Only show the last 10 calculations 
descending from most recent to oldest.

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

