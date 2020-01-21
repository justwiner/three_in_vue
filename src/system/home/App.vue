<template>
    <div>
        <p v-for="(item, index) in router" :key="index">
            <a target="blank" :href="item.path">{{item.name}}</a>
        </p>
    </div>
</template>

<script>
export default {
    name: 'home',
    data () {
        return {
            router: [
                {
                    name: '粒子效果',
                    path: '/particle.html'
                },
                // {
                //     name: '粒子动画-结合Tween.js',
                //     path: '/particle_tween.html'
                // }
            ]
        }
    }
}
</script>

<style scoped>

</style>