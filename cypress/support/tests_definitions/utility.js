import convertTime from "../../../src/utils/convertTime";

Cypress.Commands.add('testUtilityFunctions',(utilObject)=>{
    convertTimeTests(utilObject.convertTime);
});


function convertTimeTests(utilObject){
    expect(convertTime('16:00',utilObject.twelve_hour_format)).to.be.eq('4:00 PM');
    expect(convertTime('16:00:00',utilObject.twelve_hour_format)).to.be.eq('4:00 PM');
    expect(convertTime('09:00',utilObject.twelve_hour_format)).to.be.eq('9:00 AM');
    expect(convertTime('9:0',utilObject.twelve_hour_format)).to.be.eq('9:00 AM');
    expect(convertTime('9 am',utilObject.twelve_hour_format)).to.be.eq('9:00 A');
    expect(convertTime('4 pm',utilObject.twelve_hour_format)).to.be.eq('16:00 A');
    expect(convertTime('9:0:00',utilObject.twelve_hour_format)).to.be.eq('9:00 AM');
   
    expect(convertTime('16:00',utilObject.twenty_four_hour_format)).to.be.eq('16:00');
    expect(convertTime('09:00',utilObject.twenty_four_hour_format)).to.be.eq('09:00');
    expect(convertTime('09:00:00',utilObject.twenty_four_hour_format)).to.be.eq('09:00');
    expect(convertTime('9:0',utilObject.twenty_four_hour_format)).to.be.eq('09:00');
    expect(convertTime('9:0:0',utilObject.twenty_four_hour_format)).to.be.eq('09:00');
    expect(convertTime('9 am',utilObject.twenty_four_hour_format)).to.be.eq('09:00');
    expect(convertTime('4 pm',utilObject.twenty_four_hour_format)).to.be.eq('04:00');

    expect(convertTime('16:00',null)).to.be.eq('4:00 pm');
    expect(convertTime('16:00:00',null)).to.be.eq('4:00 pm');
    expect(convertTime('09:00',null)).to.be.eq('9:00 am');
    expect(convertTime('9:0',null)).to.be.eq('9:00 am');
    expect(convertTime('9:0:00',null)).to.be.eq('9:00 am');
}

