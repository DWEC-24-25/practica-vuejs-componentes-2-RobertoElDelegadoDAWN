const { createApp, defineComponent, ref } = Vue;

// Sample data
const server_data = {
    collection: {
        title: "Movie List",
        type: "movie",
        version: "1.0",
        items: [
            {
                href: "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings_(film_series)",
                data: [
                    { name: "name", value: "The Lord of the Rings", prompt: "Name" },
                    { name: "description", value: "The Lord of the Rings is a film series consisting of three high fantasy adventure films directed by Peter Jackson. They are based on the novel The Lord of the Rings by J. R. R. Tolkien.", prompt: "Description" },
                    { name: "director", value: "Peter Jackson", prompt: "Director" },
                    { name: "datePublished", value: "2001-12-19", prompt: "Release Date" }
                ]
            },
            {
                href: "https://en.wikipedia.org/wiki/The_Hunger_Games_(film_series)",
                data: [
                    { name: "name", value: "The Hunger Games", prompt: "Name" },
                    { name: "description", value: "The Hunger Games film series consists of four science fiction dystopian adventure films based on The Hunger Games trilogy of novels, by the American author Suzanne Collins.", prompt: "Description" },
                    { name: "director", value: "Gary Ross", prompt: "Director" },
                    { name: "datePublished", value: "2012-03-12", prompt: "Release Date" }
                ]
            },
            {
                href: "https://en.wikipedia.org/wiki/Game_of_Thrones",
                data: [
                    { name: "name", value: "Game of Thrones", prompt: "Name" },
                    { name: "description", value: "Game of Thrones is an American fantasy drama television series created by David Benioff and D. B. Weiss.", prompt: "Description" },
                    { name: "director", value: "Alan Taylor et al", prompt: "Director" },
                    { name: "datePublished", value: "2011-04-17", prompt: "Release Date" }
                ]
            }
        ]
    }
};

// Componente edit-form
const EditForm = defineComponent({
    props: {
        itemdata: {
            type: Array,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    template: `
        <div>
            <h2>Edit Form</h2>
            <form>
                <div v-for="data in itemdata" :key="data.name">
                    <label :for="'input-' + index + '-' + data.name">{{ data.prompt }}</label>
                    <div v-if="data.name === 'description'">
                        <textarea :id="'input-' + index + '-' + data.name" v-model="data.value" class="form-control" rows="4"></textarea>
                    </div>
                    <div v-else>
                        <input :id="'input-' + index + '-' + data.name" v-model="data.value" class="form-control" />
                    </div>
                </div>
                <button type="button" class="btn btn-secondary mt-3" @click="closeForm">Cerrar</button>
            </form>
        </div>
    `,
    methods: {
        closeForm() {
            this.$emit('formClosed');
        }
    }
});

// Componente item-data
const ItemData = defineComponent({
    props: {
        item: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            isEditFormVisible: false
        };
    },
    methods: {
        toggleEditFormVisibility() {
            this.isEditFormVisible = !this.isEditFormVisible;
        }
    },
    template: `
        <div class="col-12 col-md-6 col-lg-4 mb-4">
            <div class="card h-100">
                <div class="card-body" v-if="!isEditFormVisible">
                    <dl>
                        <div v-for="data in item.data" :key="data.name">
                            <dt>{{ data.prompt }}</dt>
                            <dd>{{ data.value }}</dd>
                        </div>
                    </dl>
                    <a :href="item.href" class="btn btn-primary">Ver</a>
                    <button class="btn btn-secondary" @click="toggleEditFormVisibility">Editar</button>
                </div>
                <edit-form v-if="isEditFormVisible" :itemdata="item.data" :index="index" @formClosed="toggleEditFormVisibility"></edit-form>
            </div>
        </div>
    `
});

// Crear la aplicación Vue
const app = createApp({
    data() {
        return {
            collection: server_data.collection
        };
    }
});

// Registrar los componentes globalmente
app.component('edit-form', EditForm);
app.component('item-data', ItemData);

// Montar la aplicación en el elemento con id 'app'
app.mount('#app');