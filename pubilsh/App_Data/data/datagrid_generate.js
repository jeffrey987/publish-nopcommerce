function updateMasterCheckbox() {
  var n = $(
      "#customers-grid input[type=checkbox][id!=mastercheckbox][class=checkboxGroups]"
    ).length,
    t = $(
      "#customers-grid input[type=checkbox][id!=mastercheckbox][class=checkboxGroups]:checked"
    ).length;
  $("#mastercheckbox").attr("checked", n == t && n > 0);
}
function updateTable(n) {
  $(n)
    .DataTable()
    .ajax.reload();
  !0 &&
    ($("#mastercheckbox")
      .attr("checked", !1)
      .change(),
    (selectedIds = []));
}
var selectedIds = [];
$(document).ready(function() {
  $("#customers-grid").DataTable({
    processing: !0,
    serverSide: !0,
    ajax: {
      url: "/Admin/Customer/CustomerList",
      type: "POST",
      dataType: "json",
      dataSrc: "Data",
      data: function(n) {
        return (
          (n.SelectedCustomerRoleIds = $("#SelectedCustomerRoleIds").val()),
          (n.SearchEmail = $("#SearchEmail").val()),
          (n.SearchUsername = $("#SearchUsername").val()),
          (n.SearchFirstName = $("#SearchFirstName").val()),
          (n.SearchLastName = $("#SearchLastName").val()),
          (n.SearchDayOfBirth = $("#SearchDayOfBirth").val()),
          (n.SearchMonthOfBirth = $("#SearchMonthOfBirth").val()),
          (n.SearchCompany = $("#SearchCompany").val()),
          (n.SearchPhone = $("#SearchPhone").val()),
          (n.SearchZipPostalCode = $("#SearchZipPostalCode").val()),
          (n.SearchIpAddress = $("#SearchIpAddress").val()),
          addAntiForgeryToken(n),
          n
        );
      }
    },
    scrollX: !0,
    info: !0,
    paging: !0,
    pagingType: "simple_numbers",
    language: {
      emptyTable: "No data available in table",
      info: "_START_-_END_ of _TOTAL_ items",
      infoEmpty: "No records",
      infoFiltered: "(filtered from _MAX_ total entries)",
      thousands: ",",
      lengthMenu: "Show _MENU_ items",
      loadingRecords: "Loading...",
      processing: "<i class='fa fa-refresh fa-spin'></i>",
      search: "Search:",
      zeroRecords: "No matching records found",
      paginate: {
        first: "<i class='k-icon k-i-seek-w'></i>",
        last: "<i class='k-icon k-i-seek-e'></i>",
        next: "<i class='k-icon k-i-arrow-e'></i>",
        previous: "<i class='k-icon k-i-arrow-w'></i>"
      },
      aria: {
        sortAscending: ": activate to sort column ascending",
        sortDescending: ": activate to sort column descending"
      }
    },
    pageLength: 15,
    lengthMenu: [7, 15, 20, 50, 100],
    ordering: !1,
    fixedHeader: !1,
    dom:
      '<"row"<"col-md-12"t>><"row margin-t-5"<"col-lg-5 col-md-5 col-xs-5"<"pull-left"p>><"col-lg-3 col-md-3 col-xs-3"<"pull-left"l>><"col-lg-3 col-md-3 col-xs-3"<"pull-right"i>><"col-lg-1 col-md-1 col-xs-1"<"pull-right"B>>>',
    buttons: [
      {
        name: "refresh",
        text: '<i class="fa fa-refresh" style="padding-left: 5px"></i>',
        action: function() {
          updateTable("#customers-grid");
        }
      }
    ],
    columns: [
      {
        title: '<input id="mastercheckbox" type="checkbox"/>',
        width: "50",
        visible: !0,
        searchable: !1,
        className: "text-center",
        render: function(n, t, i) {
          return n === "true"
            ? '<input name="checkbox_customers" value="' +
                i.Id +
                '" type="checkbox" class="checkboxGroups" checked="checked" />'
            : '<input name="checkbox_customers" value="' +
                i.Id +
                '" type="checkbox" class="checkboxGroups" />';
        },
        data: "Id"
      },
      {
        title: "Email",
        width: "200",
        visible: !0,
        searchable: !1,
        render: $.fn.dataTable.render.text(),
        data: "Email"
      },
      {
        title: "Name",
        width: "200",
        visible: !0,
        searchable: !1,
        render: $.fn.dataTable.render.text(),
        data: "FullName"
      },
      {
        title: "Customer roles",
        width: "200",
        visible: !0,
        searchable: !1,
        render: $.fn.dataTable.render.text(),
        data: "CustomerRoleNames"
      },
      {
        title: "Company name",
        width: "200",
        visible: !0,
        searchable: !1,
        render: $.fn.dataTable.render.text(),
        data: "Company"
      },
      {
        title: "Active",
        width: "100",
        visible: !0,
        searchable: !1,
        className: "text-center",
        render: function(n) {
          return n == !0
            ? '<i class="fa fa-check true-icon" nop-value="true"></i>'
            : '<i class="fa fa-close false-icon" nop-value="false"></i>';
        },
        data: "Active"
      },
      {
        title: "Created on",
        width: "200",
        visible: !0,
        searchable: !1,
        render: function(n) {
          return n
            ? moment(n)
                .locale("en")
                .format("MM/DD/YYYY HH:mm:ss")
            : null;
        },
        data: "CreatedOn"
      },
      {
        title: "Last activity",
        width: "200",
        visible: !0,
        searchable: !1,
        render: function(n) {
          return n
            ? moment(n)
                .locale("en")
                .format("MM/DD/YYYY HH:mm:ss")
            : null;
        },
        data: "LastActivityDate"
      },
      {
        title: "Edit",
        width: "100",
        visible: !0,
        searchable: !1,
        className: "button-column",
        render: function(n) {
          return (
            '<a class="btn btn-default" href="Edit/' +
            n +
            '"><i class="fa fa-pencil"></i>Edit</a>'
          );
        },
        data: "Id"
      }
    ]
  });
  $("#search-customers").click(function() {
    return (
      $("#customers-grid")
        .DataTable()
        .ajax.reload(),
      $(".checkboxGroups")
        .attr("checked", !1)
        .change(),
      (selectedIds = []),
      !1
    );
  });
  $("#mastercheckbox").click(function() {
    $(".checkboxGroups")
      .attr("checked", $(this).is(":checked"))
      .change();
  });
  $("#customers-grid").on(
    "change",
    "input[type=checkbox][id!=mastercheckbox][class=checkboxGroups]",
    function() {
      var n = $(this),
        t = jQuery.inArray(n.val(), selectedIds);
      n.is(":checked") == !0
        ? t == -1 && selectedIds.push(n.val())
        : t > -1 &&
          (selectedIds = $.grep(selectedIds, function(t) {
            return t != n.val();
          }));
      updateMasterCheckbox();
    }
  );
});
