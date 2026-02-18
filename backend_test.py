#!/usr/bin/env python3
"""
EveryDog League Backend API Testing Suite
Tests all backend APIs comprehensively with real endpoints
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class EveryDogAPITester:
    def __init__(self, base_url="https://everydog-fly.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, passed: bool, details: str = ""):
        """Log test result"""
        self.tests_run += 1
        if passed:
            self.tests_passed += 1
        
        result = {
            "test": name,
            "passed": passed,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"   Details: {details}")
        print()

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int, data=None, headers=None) -> tuple:
        """Execute a single API test"""
        url = f"{self.base_url}/{endpoint}" if not endpoint.startswith('http') else endpoint
        if headers is None:
            headers = {'Content-Type': 'application/json'}
        
        try:
            print(f"🔍 Testing {name}...")
            print(f"   URL: {url}")
            
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)
            
            success = response.status_code == expected_status
            response_data = {}
            
            try:
                response_data = response.json()
            except:
                response_data = {"text": response.text}
            
            details = f"Status: {response.status_code} (expected {expected_status})"
            if not success:
                details += f" | Response: {response_data}"
            
            self.log_test(name, success, details)
            return success, response_data
            
        except Exception as e:
            error_msg = f"Request error: {str(e)}"
            self.log_test(name, False, error_msg)
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, data = self.run_test(
            "API Root Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_get_all_events(self):
        """Test GET /events endpoint"""
        success, data = self.run_test(
            "Get All Events",
            "GET", 
            "events",
            200
        )
        
        if success:
            events = data.get('events', [])
            expected_count = 7
            if len(events) == expected_count:
                self.log_test(f"Events Count Check ({expected_count} expected)", True, f"Found {len(events)} events")
            else:
                self.log_test(f"Events Count Check ({expected_count} expected)", False, f"Found {len(events)} events")
            
            # Check if events have required fields
            if events:
                event = events[0]
                required_fields = ['id', 'title', 'date', 'location', 'skill_level', 'capacity', 'registered_count']
                missing_fields = [field for field in required_fields if field not in event]
                
                if not missing_fields:
                    self.log_test("Event Schema Validation", True, "All required fields present")
                else:
                    self.log_test("Event Schema Validation", False, f"Missing fields: {missing_fields}")
        
        return success, data

    def test_events_with_filters(self):
        """Test events filtering and sorting"""
        # Test skill level filter
        success1, _ = self.run_test(
            "Events Filter by Skill Level (Beginner)",
            "GET",
            "events?skill_level=Beginner",
            200
        )
        
        success2, _ = self.run_test(
            "Events Filter by Skill Level (Advanced)",
            "GET", 
            "events?skill_level=Advanced",
            200
        )
        
        # Test sorting
        success3, _ = self.run_test(
            "Events Sort (Soonest)",
            "GET",
            "events?sort=soonest",
            200
        )
        
        success4, _ = self.run_test(
            "Events Sort (Latest)",
            "GET",
            "events?sort=latest", 
            200
        )
        
        return success1 and success2 and success3 and success4

    def test_get_specific_events(self):
        """Test GET /events/{id} for specific event IDs"""
        event_ids = ['evt-001', 'evt-002', 'evt-003', 'evt-007']
        success_count = 0
        
        for event_id in event_ids:
            success, data = self.run_test(
                f"Get Event by ID ({event_id})",
                "GET",
                f"events/{event_id}",
                200
            )
            if success:
                success_count += 1
                
                # Validate event data structure
                required_fields = ['id', 'title', 'date', 'location', 'description', 'skill_level']
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    self.log_test(f"Event {event_id} Schema Validation", True, "All required fields present")
                else:
                    self.log_test(f"Event {event_id} Schema Validation", False, f"Missing: {missing_fields}")
        
        # Test invalid event ID
        success, _ = self.run_test(
            "Get Non-existent Event (Should Fail)",
            "GET",
            "events/invalid-id",
            404
        )
        
        return success_count == len(event_ids) and success

    def test_event_registration(self):
        """Test event registration flow"""
        # Valid registration data
        registration_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": f"test{datetime.now().strftime('%H%M%S')}@example.com", 
            "dog_name": "Buddy",
            "dog_breed": "Golden Retriever",
            "dog_size": "Large",
            "experience_level": "Beginner",
            "waiver_signed": True
        }
        
        # Test successful registration
        success1, data1 = self.run_test(
            "Valid Event Registration",
            "POST",
            "events/evt-001/register",
            200,
            registration_data
        )
        
        if success1:
            if 'registration_id' in data1:
                self.log_test("Registration ID Generated", True, f"ID: {data1['registration_id']}")
            else:
                self.log_test("Registration ID Generated", False, "No registration_id in response")
        
        # Test duplicate registration (should fail)
        success2, _ = self.run_test(
            "Duplicate Registration (Should Fail)",
            "POST",
            "events/evt-001/register", 
            400,
            registration_data
        )
        
        # Test registration without waiver (should fail)
        invalid_data = registration_data.copy()
        invalid_data["waiver_signed"] = False
        invalid_data["email"] = f"test_no_waiver_{datetime.now().strftime('%H%M%S')}@example.com"
        
        success3, _ = self.run_test(
            "Registration without Waiver (Should Fail)",
            "POST",
            "events/evt-001/register",
            400, 
            invalid_data
        )
        
        # Test registration for non-existent event
        valid_data_new_email = registration_data.copy()
        valid_data_new_email["email"] = f"test_invalid_event_{datetime.now().strftime('%H%M%S')}@example.com"
        
        success4, _ = self.run_test(
            "Registration for Non-existent Event (Should Fail)",
            "POST",
            "events/invalid-event/register",
            404,
            valid_data_new_email
        )
        
        return success1 and success2 and success3 and success4

    def test_newsletter_subscription(self):
        """Test newsletter subscription"""
        # Test valid subscription
        email_data = {"email": f"newsletter_test_{datetime.now().strftime('%H%M%S')}@example.com"}
        
        success1, data1 = self.run_test(
            "Valid Newsletter Subscription",
            "POST",
            "newsletter",
            200,
            email_data
        )
        
        # Test duplicate subscription (should fail)
        success2, _ = self.run_test(
            "Duplicate Newsletter Subscription (Should Fail)",
            "POST",
            "newsletter",
            400,
            email_data
        )
        
        # Test invalid email format
        invalid_email_data = {"email": "invalid-email"}
        success3, _ = self.run_test(
            "Invalid Email Format Newsletter",
            "POST",
            "newsletter",
            422,  # Pydantic validation error
            invalid_email_data
        )
        
        return success1 and success2

    def test_contact_form(self):
        """Test contact form submission"""
        # Valid contact data
        contact_data = {
            "name": f"Test Contact {datetime.now().strftime('%H%M%S')}",
            "email": f"contact_test_{datetime.now().strftime('%H%M%S')}@example.com",
            "message": "This is a test contact message for EveryDog League testing.",
            "volunteer_interest": False
        }
        
        success1, data1 = self.run_test(
            "Valid Contact Form Submission",
            "POST",
            "contact",
            200,
            contact_data
        )
        
        # Test with volunteer interest 
        volunteer_data = contact_data.copy()
        volunteer_data["email"] = f"volunteer_test_{datetime.now().strftime('%H%M%S')}@example.com"
        volunteer_data["volunteer_interest"] = True
        volunteer_data["message"] = "I'm interested in volunteering!"
        
        success2, _ = self.run_test(
            "Contact Form with Volunteer Interest",
            "POST",
            "contact",
            200,
            volunteer_data
        )
        
        # Test missing required fields
        incomplete_data = {"name": "Test"}
        success3, _ = self.run_test(
            "Contact Form Missing Fields (Should Fail)",
            "POST",
            "contact",
            422,
            incomplete_data
        )
        
        return success1 and success2

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting EveryDog League Backend API Testing")
        print("=" * 60)
        print()
        
        # Test API connectivity
        self.test_root_endpoint()
        
        # Test events endpoints
        self.test_get_all_events()
        self.test_events_with_filters()
        self.test_get_specific_events()
        
        # Test registration flow
        self.test_event_registration()
        
        # Test newsletter
        self.test_newsletter_subscription()
        
        # Test contact form
        self.test_contact_form()
        
        # Print final results
        print("=" * 60)
        print(f"📊 FINAL RESULTS:")
        print(f"   Tests Run: {self.tests_run}")
        print(f"   Tests Passed: {self.tests_passed}")  
        print(f"   Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"   Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        print("=" * 60)
        
        return self.tests_passed == self.tests_run

def main():
    """Main test runner"""
    tester = EveryDogAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open('/tmp/backend_test_results.json', 'w') as f:
        json.dump({
            'summary': {
                'total_tests': tester.tests_run,
                'passed_tests': tester.tests_passed,
                'failed_tests': tester.tests_run - tester.tests_passed,
                'success_rate': (tester.tests_passed/tester.tests_run)*100 if tester.tests_run > 0 else 0
            },
            'test_results': tester.test_results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())