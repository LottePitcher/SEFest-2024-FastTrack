# Swedish Festival 2024 "Fast-track" Sample

This repository is the source code demonstrated in the talk "Fast-track to Customising Umbraco’s Backoffice" by Lotte Pitcher and Niels Lyngsø at the Swedish Festival 2024.

## Running Locally

> [!NOTE]  
> We have installed uSync.Complete to allow the importing of members. 
> uSync.Complete can be used without a license for 60 days.

### v13 Site

Run the 'FastTrack.v13' site and go through the standard Umbraco installation process.

Settings > uSync > Everything : click the Import button. This should:
- Import the 'Date Picker with Status' data type
- Update the Member type with the custom properties
- Add 15 members with varying subscription expiry dates

### v14 Site

After you have run the v13 site and done the uSync import, you can then set up the v14 site:
- Copy the `Fastrack.v13\umbraco\data\Umbraco.sqlite.db` into that location in the v14 site (make sure you have stopped the v13 site running first!)
- Run the 'FastTrack.v14' site: the upgrade to v14 should happen automatically and should be able to log in as you did in the v13 site.

### v15 Site

Can be set up in the same way as the v14 site.

## Custom Functionality

### Custom Property Editor: Date Picker With Status

Members have a 'Subscription expiry date' property.

The "Date Picker with Status" property editor extends a standard date picker input.

When configuring the data type, the user can specify the labels to display alongside the date picker to indicate whether the date is:
- Today or in the future (i.e. the subscription is Active)
- In the past (i.e. the subscription has Expired)
- Not set (i.e. the subscription has not been Started)

The user can also configure the data type to display 'Add X Months' buttons using a comma separated list of the months to add.
