describe('PhoneCat controllers', function () {
	describe('PhoneListCtrl', function () {
		it('should create a "phones" model with 3 phones', function () {
			var scope = {},
				ctrl = new PhoneListCtrl(scope);

			expect(scope.phones.length).toBe(3);
		});
	});
});
