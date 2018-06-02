<template>

<div class="lv-settings--menu">

			<div class="lv-settings--photo">
				<a href="#" class="lv-userinfo--avatar"> AB </a>
				<a href="#" class="lv-settings-changephoto-button icn-camera-pink">Change profile photo</a>
			</div>


			<div class="lv-settings-nav--block">

				<span class="lv-settings-nav--title">SettingsSSSSS</span>


				<div class="lv-setting-nav--links">			
					<router-link to="/settings" href="#" class="lv-settings-nav--link icn-settings-line " @click="">General settings</router-link>
					<router-link to="/settings/privacy" href="#" class="lv-settings-nav--link icn-settings-lock-line">Privacy</router-link>
					<router-link to="/settings/notification" href="#" class="lv-settings-nav--link icn-settings-bell-line">Notification</router-link>
					<router-link to="/settings/blacklist" href="#" class="lv-settings-nav--link icn-settings-blacklist-line">Blacklist</router-link>
					<router-link to="/settings/password" href="#" class="lv-settings-nav--link icn-settings-repassword">Password</router-link>
				
				</div>

				<div class="lv-settings-logout-wrap">
					<a href="#" class="lv-settings-nav--link--logout icn-logout">Log out</a>

					<div class="lv-settings--langselect-wrapper">

					
					<div class="lv-lang-button--current">eng</div>			<div class="lv-lang-dropup">
						<div class="lv-lang-dropup--items">
							<a href="#" class="lv-lang-select-item"> eng</a>
							<a href="#" class="lv-lang-select-item">рус</a>
						</div>
					</div>
					</div> 

				</div>

			</div> <!-- nav block -->
			


		</div>	<!-- lv menu -->
</template>


<script >
	module.exports = {
		data: function() {
			return {
				
			}
		}

	}
</script>