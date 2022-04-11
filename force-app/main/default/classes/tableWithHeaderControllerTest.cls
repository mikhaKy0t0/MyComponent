@isTest
public class tableWithHeaderControllerTest {

    /*@TestSetup static void makeData() {
    }*/

    @isTest public static void testApex() {
        // DataFactory - main
        Account testAcc = testDataFactory.createAccountWithConts(10);
        Test.startTest();
        	List<Contact> testList = tableWithHeaderController.relatedRecords (testAcc.Id, 'contact', 'FirstName', 'Name', 'ASC');
        Test.stopTest();
        System.AssertEquals(testList.size(), 10);
        System.AssertEquals(testList[9].FirstName, 'First9'); //checking sorting
        
    }

    @isTest public static void testApexSecond(){
        /* Regular insert - second variant
        Account secondTestAcc = new Account(Name = 'Account For Unit Test');
        insert secondTestAcc;
        
        List<Contact> contacts = new List<Contact>();
        for (Integer count = 0; count < 20; count++) {
            contacts.add(new Contact (FirstName = 'First'+count, LastName ='Last'+count, AccountId = secondTestAcc.Id));
        }
        insert contacts;
        */

        Account secondTestAcc = testDataFactory.createAccountWithConts(20);

        Test.startTest();
        	List<Contact> secondTestList = tableWithHeaderController.relatedRecords (secondTestAcc.Id, 'contact', 'Id', null, null);
        Test.stopTest();
        System.AssertEquals(secondTestList.size(), 20);
        
    }
    
}