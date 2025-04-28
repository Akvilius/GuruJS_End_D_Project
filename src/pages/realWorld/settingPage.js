
export class SettingPage {
    constructor (page)
    {
        this.page = page;
        this.passwordField = page.getByPlaceholder('Password');
        this.updateSettingButton =page.getByRole('button', { name: 'Update Settings' });;
    }

    async updatePassword (newPassword) {

        await this.passwordField.click();
        await this.passwordField.fill(newPassword);
        await this.updateSettingButton.click();
    }

}
