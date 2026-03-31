@echo off
echo Testing Save Profile...
curl -X POST "http://localhost:8091/api/student/profile?username=STU2024001" -H "Content-Type: application/json" -d "{\"address\": \"Colombo\", \"parentName\": \"Mr. Silva\", \"parentContact\": \"0771234567\"}"
echo .
echo Testing Get Profile...
curl -X GET "http://localhost:8091/api/student/STU2024001"
echo .
