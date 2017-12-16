describe('Main Tests', function() {

    beforeEach(() => {
        browser.get('/');
    });

    describe('Main Test', () => {
        it('should run', () => {
            expect(1).toBe(1);
        });
    });

});