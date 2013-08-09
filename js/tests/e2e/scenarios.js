describe('PhoneCat App', function () {
	describe('Phone List View', function () {
		beforeEach(function () {
			browser().navigateTo('/index.html#/phones');
		});

		it('should filter the phone list as user types into the search box', function () {
			expect(repeater('.phones li').count()).toBe(20);

			input('query').enter('nexus');
			expect(repeater('.phones li').count()).toBe(1);

			input('query').enter('motorola');
			expect(repeater('.phones li').count()).toBe(8);
		});

		it('should display the current filter value within an element with id "status"', function () {
			expect(element('#status').text()).toMatch(/Current filter: \s*$/);

			input('query').enter('nexus');

			expect(element('#status').text()).toMatch(/Current filter: nexus\s*$/);

			// using('#status').expect(binding('query')).toBe('nexus');
		});

		it('should be possible to control phone order via the drop-down select box', function () {
			input('query').enter('tablet');

			expect(repeater('.phones li', 'Phone List').column('phone.name')).
				toEqual(['Motorola XOOM\u2122 with Wi-Fi', 'Motorola XOOM\u2122']);

			select('orderProp').option('Alphabetical');

			expect(repeater('.phones li', 'Phone List').column('phone.name')).
				toEqual(['Motorola XOOM\u2122', 'Motorola XOOM\u2122 with Wi-Fi']);
		});

		it('should render phone specific links', function () {
			input('query').enter('nexus');
			element('.phones li a').click();
			expect(browser().location().url()).toBe('/phones/nexus-s');
		});
	});
	
	describe('Phone detail view', function () {
		beforeEach(function () {
			browser().navigateTo('/index.html#/phones/nexus-s');
		});

		it('should display nexus-s page', function () {
			expect(binding('phone.name')).toBe('Nexus S');
		});	

		it('should have four thumbnail images', function () {
			expect(repeater('.phone-thumbs li > img').count()).toBe(4);
		});
	});
});
