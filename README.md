### Run backend service
cd ./backend
mvnw spring-boot:run

### Run test
cd ./test
npm run spec
npm run test

### Clean & initialize database
cd ./test
npm run clean

### clean terminal
cls