@isTest
public class testDataFactory {
    public static Account createAccountWithConts(Integer numContsPerAcct) {

        Account testAcc = new Account (Name = 'Account For Unit Test');
        insert testAcc;
        
        List<Contact> conts = new List<Contact>();
        for (Integer k=0;k<numContsPerAcct;k++) {
            conts.add(new Contact(FirstName = 'First'+k,
                                    LastName ='Last'+k,
                                    AccountId = testAcc.Id));
        }
        // Insert all contacts for account.
        insert conts;
        return testAcc;
    }
}
