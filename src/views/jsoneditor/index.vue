<template>
  <el-row>
    <el-col :span="16">
      <el-card class="form">
        <json-editor ref="JsonEditor" :schema="schema" v-model="model">
          <el-button type="primary" @click="submit">Subscribe</el-button>
          <el-button type="reset" @click="reset">Reset</el-button>
        </json-editor>
         <div id="home">
          <el-table
            size="small"
            :default-sort="{ prop: 'sortNum', order: 'ascending' }"
            :data="tableData"
            border
            align="left"
          >
            <el-table-column
              show-overflow-tooltip
              v-for="(item, index) in col"
              :key="`col_${index}`"
              :prop="col[index].prop"
              :label="item.label"
            >
              <template slot-scope="scope">
                <p>{{ scope.row[item.prop] }}</p>
                <p v-if="item.label === '操作'">
                  <el-button size="mini" type="success">上架</el-button>
                </p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Model</span>
        </div>
        <pre class="json">{{ jsonString }}</pre>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import Sortable from "sortablejs";

import JsonEditor from "./JsonEditor/JsonEditor.vue";
import { Option } from "element-ui";

JsonEditor.setComponent("form", "el-form", ({ vm }) => {
  // vm is the JsonEditor VM
  // console.log(JSON.stringify(vm.data));
  // console.log(JSON.stringify(vm.fields));

  const labelWidth = "120px";
  const model = vm.data;
  const rules = {};

  function parseField(fields) {
    Object.keys(fields).forEach((key) => {
      if (key.indexOf("$") === 0 && key !== "$sub") return;
      const field = fields[key];
      if (field.$sub) {
        return parseField(field);
      }
      if (!field.name) return;
      rules[field.name] = [];
      // http://element.eleme.io/#/en-US/component/form#validation
      const type =
        field.schemaType === "array" && field.type === "radio"
          ? "string"
          : field.schemaType;
      const required = field.required;
      const message = field.title;
      const trigger = ["radio", "checkbox", "select"].includes(field.type)
        ? "change"
        : "blur";
      rules[field.name].push({ type, required, message, trigger });

      if (field.minlength !== undefined || field.maxlength !== undefined) {
        const max = field.maxlength || 255;
        const min = field.minlength || 0;
        const msg = `Length must between ${min} and ${max}`;
        rules[field.name].push({ min, max, message: msg, trigger });
      }
    });
  }

  parseField(vm.fields);

  // returning the form props
  return { labelWidth, rules, model };
});

// http://element.eleme.io/#/en-US/component/form#validation
JsonEditor.setComponent("label", "el-form-item", ({ field }) => ({
  prop: field.name,
}));

JsonEditor.setComponent("email", "el-input");
JsonEditor.setComponent("url", "el-input");
JsonEditor.setComponent("number", "el-input-number");
JsonEditor.setComponent("text", "el-input");
JsonEditor.setComponent("textarea", "el-input");
JsonEditor.setComponent("checkbox", "el-checkbox");
JsonEditor.setComponent("checkboxgroup", "el-checkbox-group");
JsonEditor.setComponent("radio", "el-radio");
JsonEditor.setComponent("select", "el-select");
JsonEditor.setComponent("switch", "el-switch");
JsonEditor.setComponent("color", "el-color-picker");
JsonEditor.setComponent("rate", "el-rate");
// JsonEditor.setComponent("table", "el-table",  ({ field }) => {
//   console.log(JSON.stringify(field))
//   return {
//     ref:"tabssss"
//   };
// });

// You can also use the component object
JsonEditor.setComponent("option", Option);

// By default `<h1/>` is used to render the form title.
// To override this, use the `title` type:
JsonEditor.setComponent("title", "h2");

// By default `<p/>` is used to render the form title.
// To override this, use the `description` type:
JsonEditor.setComponent("description", "small");

// By default `<div/>` is used to render the message error.
// To override this, use the `error` type:
JsonEditor.setComponent("error", "el-alert", ({ vm }) => ({
  type: "error",
  title: vm.error,
}));

function requestData(url, param) {
  var xmlhttp = new XMLHttpRequest();
  var result = null;
  xmlhttp.open("POST", url, false);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // 同步请求成功
      result = xmlhttp.responseText;
    }
  };
  xmlhttp.send(JSON.stringify(param));
  return result;
}

export default {
  components: {
    Sortable,
  },
  data: () => ({
    col: [
      {
        label: "位置",
        prop: "location",
      },
      {
        label: "广告信息",
        prop: "content",
      },
      {
        label: "跳转url",
        prop: "url",
      },
      {
        label: "操作",
        prop: "isClick",
      },
    ],
    tableData: [
      {
        location: "A1",
        content: "落魄前端炒粉",
        url: "http://888.com",
      },
      {
        location: "A3",
        content: "人到中年秃不由己",
        url: "http://666666.com",
      },
      {
        location: "A2",
        content: "落魄前端炒粉",
        url: "http://dddd.com",
      },
    ],
    schema: {},
    model: {},
  }),
  created() {
    console.log("create");
    this.schema = JSON.parse(requestData("/pweb/getSchema.do", {})); //require("./schema/newsletter");
    this.model = JSON.parse(requestData("/pweb/getModel.do", {})); //require("./model/newsletter");
  },
  computed: {
    jsonString() {
      return JSON.stringify(this.model, null, 2).trim();
    },
  },
  mounted() {
    console.log("mounted");

    this.rowDrop();
    // var table = document.getElementById("tableID");
    // Sortable.create(table);
  },
  methods: {
    rowDrop() {
      const tbody = document.getElementById("home").querySelector(".el-table__body-wrapper tbody");
      Sortable.create(tbody, {
        onEnd: (evt) => {
          this.tableData.splice(
            evt.newIndex,
            0,
            this.tableData.splice(evt.oldIndex, 1)[0]
          );
          var newArray = this.tableData.slice(0);
          this.tableData = [];
          this.$nextTick(function () {
            this.tableData = newArray;
            // alert(JSON.stringify(this.tableData, null, 4));
          });

          // debugger;
        },
      });
    },
    submit(_e) {
      this.$refs.JsonEditor.form().validate((valid) => {
        if (valid) {
          // this.model contains the valid data according your JSON Schema.
          // You can submit your model to the server here

          // eslint-disable-next-line no-console
          console.log("model", JSON.stringify(this.model));

          axios({
            method: "post",
            url: "/pweb/setModel.do",
            data: this.model,
          }).then((response) => {
            this.model = response.data;
          });

          this.$refs.JsonEditor.clearErrorMessage();
        } else {
          this.$refs.JsonEditor.setErrorMessage(
            "Please fill out the required fields"
          );
          return false;
        }
      });
    },
    reset() {
      this.$refs.JsonEditor.reset();
    },
  },
  components: { JsonEditor },
};
</script>

<style>
.form {
  text-align: left;
  width: 90%;
  margin: auto;
}

h2 {
  font-size: 1.7em;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0.2em;
}

h2 + small {
  display: block;
  text-align: center;
  margin-bottom: 1.2em;
}

small {
  line-height: 20px;
  display: block;
}

.el-alert {
  margin-bottom: 15px;
}

.el-form .sub {
  margin-left: 10%;
}

.json {
  text-align: left;
}
</style>
