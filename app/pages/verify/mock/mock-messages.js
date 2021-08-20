const mockMessages = [
    {
        vc: {
            d: {
                type: ['Not sure what index 0 should be', 'LegalEntityEngagementContextRolevLEICredential'],
                si: 'Message "to"',
                LEI: 'LEI',
                personLegalName: 'Test Testerson',
                engagementContextRole: 'Context Role',
            },
            ti: 'Message "from"',
            i: 'Credential',
        },
        status: 'Status',
    },
    {
        vc: {
            d: {
                type: ['Not sure what index 0 should be', 'LegalEntityOfficialOrganizationalRolevLEICredential'],
                si: 'Message "to"',
                LEI: 'LEI',
                personLegalName: 'Test Testerson',
                officialRole: 'Context Role',
            },
            ti: 'Message "from"',
            i: 'Credential',
        },
        status: 'Status',
    },
    {
        vc: {
            d: {
                type: ['Not sure what index 0 should be', 'Something else'],
                si: 'Message "to"',
                LEI: 'LEI',
            },
            ti: 'Message "from"',
            i: 'Credential',
        },
        status: 'Status',
    },
];

module.exports = mockMessages;
