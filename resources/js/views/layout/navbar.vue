<script>
export default {
    
};
</script>
<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-nav>
                <router-link to="/" class="nav-link">Home</router-link>
                <router-link :to="{ name: 'about' }" class="nav-link">About</router-link>
                <router-link :to="{ name: 'contact' }" class="nav-link">Contact</router-link>
                <router-link :to="{ name : 'employe'}" class="nav-link">Employe</router-link>
                <!-- <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                    <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">FA</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown text="User" right>
                    <b-dropdown-item href="#">Account</b-dropdown-item>
                    <b-dropdown-item href="#">Settings</b-dropdown-item>
                </b-nav-item-dropdown> -->
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>
