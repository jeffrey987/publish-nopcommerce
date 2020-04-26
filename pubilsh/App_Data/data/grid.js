// 设置表头上的checkbox是否选中
function updateMasterCheckbox() {
  var n = $(
      "#productreviews-grid input[type=checkbox][id!=mastercheckbox][class=checkboxGroups]"
    ).length,
    t = $(
      "#productreviews-grid input[type=checkbox][id!=mastercheckbox][class=checkboxGroups]:checked"
    ).length;
  $("#mastercheckbox").attr("checked", n == t && n > 0);
}
// 点击页面上的Search按钮， 并不激活此方法。
// 点击刷新按钮、同意、不同意按钮时，才激活此方法
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
  $("#productreviews-grid").DataTable({
    processing: !0,
    serverSide: !0,
    ajax: {
      url: "/Admin/ProductReview/List",
      type: "POST",
      dataType: "json",
      dataSrc: "Data",
      data: function(n) {
        return (
          (n.CreatedOnFrom = $("#CreatedOnFrom").val()),
          (n.CreatedOnTo = $("#CreatedOnTo").val()),
          (n.SearchText = $("#SearchText").val()),
          (n.SearchStoreId = $("#SearchStoreId").val()),
          (n.SearchProductId = $("#SearchProductId").val()),
          (n.SearchApprovedId = $("#SearchApprovedId").val()),
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
          updateTable("#productreviews-grid");
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
            ? '<input name="checkbox_product_reviews" value="' +
                i.Id +
                '" type="checkbox" class="checkboxGroups" checked="checked" />'
            : '<input name="checkbox_product_reviews" value="' +
                i.Id +
                '" type="checkbox" class="checkboxGroups" />';
        },
        data: "Id"
      },
      {
        title: "Store",
        width: "150",
        visible: !1,
        searchable: !1,
        render: $.fn.dataTable.render.text(),
        data: "StoreName"
      },
      {
        title: "Product",
        width: "200",
        visible: !0,
        searchable: !1,
        render: function(n, t, i) {
          var r = $.fn.dataTable.render.text().display;
          return (
            '<a href="/Admin/Product/Edit/' +
            r(i.ProductId) +
            '">' +
            r(n) +
            "</a>"
          );
        },
        data: "ProductName"
      },
      {
        title: "Customer",
        width: "200",
        visible: !0,
        searchable: !1,
        render: function(n, t, i) {
          var r = $.fn.dataTable.render.text().display;
          return (
            '<a href="/Admin/Customer/Edit/' +
            r(i.CustomerId) +
            '">' +
            r(n) +
            "</a>"
          );
        },
        data: "CustomerInfo"
      },
      {
        title: "Title",
        width: "200",
        visible: !0,
        searchable: !1,
        render: $.fn.dataTable.render.text(),
        data: "Title"
      },
      {
        title: "Review text",
        width: "400",
        visible: !0,
        searchable: !1,
        data: "ReviewText"
      },
      {
        title: "Reply text",
        width: "400",
        visible: !0,
        searchable: !1,
        data: "ReplyText"
      },
      {
        title: "Rating",
        width: "100",
        visible: !0,
        searchable: !1,
        className: "text-center",
        render: $.fn.dataTable.render.text(),
        data: "Rating"
      },
      {
        title: "Is approved",
        width: "100",
        visible: !0,
        searchable: !1,
        className: "text-center",
        render: function(n) {
          return n == !0
            ? '<i class="fa fa-check true-icon" nop-value="true"></i>'
            : '<i class="fa fa-close false-icon" nop-value="false"></i>';
        },
        data: "IsApproved"
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
  $("#search-productreviews").click(function() {
    return (
      $("#productreviews-grid")
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
  $("#productreviews-grid").on(
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

// ============================
$(document).ready(function() {
  $("#approve-selected").click(function(n) {
    n.preventDefault();
    var t = {
      selectedIds: selectedIds
    };
    return (
      addAntiForgeryToken(t),
      $.ajax({
        cache: !1,
        type: "POST",
        url: "/Admin/ProductReview/ApproveSelected",
        data: t,
        traditional: !0,
        error: function(n, t, i) {
          $("#approveSelectedFailed-info").text(i);
          $("#approveSelectedFailed").click();
        },
        complete: function() {
          updateTable("#productreviews-grid");
        }
      }),
      !1
    );
  });
  $("#disapprove-selected").click(function(n) {
    n.preventDefault();
    var t = {
      selectedIds: selectedIds
    };
    return (
      addAntiForgeryToken(t),
      $.ajax({
        cache: !1,
        type: "POST",
        url: "/Admin/ProductReview/DisapproveSelected",
        data: t,
        traditional: !0,
        error: function(n, t, i) {
          $("#disapproveSelectedFailed-info").text(i);
          $("#disapproveSelectedFailed").click();
        },
        complete: function() {
          updateTable("#productreviews-grid");
        }
      }),
      !1
    );
  });
  $("#delete-selected-action-confirmation-submit-button").bind(
    "click",
    function() {
      var n = {
        selectedIds: selectedIds
      };
      return (
        addAntiForgeryToken(n),
        $.ajax({
          cache: !1,
          type: "POST",
          url: "/Admin/ProductReview/DeleteSelected",
          data: n,
          error: function(n, t, i) {
            $("#deleteSelectedFailed-info").text(i);
            $("#deleteSelectedFailed").click();
          },
          complete: function() {
            updateTable("#productreviews-grid");
          }
        }),
        $("#delete-selected-action-confirmation").modal("toggle"),
        !1
      );
    }
  );
});

/*

draw: 3
columns[0][data]: Id
columns[0][name]: 
columns[0][searchable]: false
columns[0][orderable]: false
columns[0][search][value]: 
columns[0][search][regex]: false
columns[1][data]: StoreName
columns[1][name]: 
columns[1][searchable]: false
columns[1][orderable]: false
columns[1][search][value]: 
columns[1][search][regex]: false
columns[2][data]: ProductName
columns[2][name]: 
columns[2][searchable]: false
columns[2][orderable]: false
columns[2][search][value]: 
columns[2][search][regex]: false
columns[3][data]: CustomerInfo
columns[3][name]: 
columns[3][searchable]: false
columns[3][orderable]: false
columns[3][search][value]: 
columns[3][search][regex]: false
columns[4][data]: Title
columns[4][name]: 
columns[4][searchable]: false
columns[4][orderable]: false
columns[4][search][value]: 
columns[4][search][regex]: false
columns[5][data]: ReviewText
columns[5][name]: 
columns[5][searchable]: false
columns[5][orderable]: false
columns[5][search][value]: 
columns[5][search][regex]: false
columns[6][data]: ReplyText
columns[6][name]: 
columns[6][searchable]: false
columns[6][orderable]: false
columns[6][search][value]: 
columns[6][search][regex]: false
columns[7][data]: Rating
columns[7][name]: 
columns[7][searchable]: false
columns[7][orderable]: false
columns[7][search][value]: 
columns[7][search][regex]: false
columns[8][data]: IsApproved
columns[8][name]: 
columns[8][searchable]: false
columns[8][orderable]: false
columns[8][search][value]: 
columns[8][search][regex]: false
columns[9][data]: CreatedOn
columns[9][name]: 
columns[9][searchable]: false
columns[9][orderable]: false
columns[9][search][value]: 
columns[9][search][regex]: false
columns[10][data]: Id
columns[10][name]: 
columns[10][searchable]: false
columns[10][orderable]: false
columns[10][search][value]: 
columns[10][search][regex]: false
start: 0
length: 15
search[value]: 
search[regex]: false
CreatedOnFrom: 
CreatedOnTo: 
SearchText: 
SearchStoreId: 0
SearchProductId: 0
SearchApprovedId: 0
__RequestVerificationToken: CfDJ8D_fpcUcCj5FlyDkuZe

// =========================================================
draw: 4
columns[0][data]: Id
columns[0][name]: 
columns[0][searchable]: false
columns[0][orderable]: false
columns[0][search][value]: 
columns[0][search][regex]: false

columns[1][data]: StoreName
columns[1][name]: 
columns[1][searchable]: false
columns[1][orderable]: false
columns[1][search][value]: 
columns[1][search][regex]: false

columns[2][data]: ProductName
columns[2][name]: 
columns[2][searchable]: false
columns[2][orderable]: false
columns[2][search][value]: 
columns[2][search][regex]: false

columns[3][data]: CustomerInfo
columns[3][name]: 
columns[3][searchable]: false
columns[3][orderable]: false
columns[3][search][value]: 
columns[3][search][regex]: false
columns[4][data]: Title
columns[4][name]: 
columns[4][searchable]: false
columns[4][orderable]: false
columns[4][search][value]: 
columns[4][search][regex]: false
columns[5][data]: ReviewText
columns[5][name]: 
columns[5][searchable]: false
columns[5][orderable]: false
columns[5][search][value]: 
columns[5][search][regex]: false
columns[6][data]: ReplyText
columns[6][name]: 
columns[6][searchable]: false
columns[6][orderable]: false
columns[6][search][value]: 
columns[6][search][regex]: false
columns[7][data]: Rating
columns[7][name]: 
columns[7][searchable]: false
columns[7][orderable]: false
columns[7][search][value]: 
columns[7][search][regex]: false
columns[8][data]: IsApproved
columns[8][name]: 
columns[8][searchable]: false
columns[8][orderable]: false
columns[8][search][value]: 
columns[8][search][regex]: false
columns[9][data]: CreatedOn
columns[9][name]: 
columns[9][searchable]: false
columns[9][orderable]: false
columns[9][search][value]: 
columns[9][search][regex]: false
columns[10][data]: Id
columns[10][name]: 
columns[10][searchable]: false
columns[10][orderable]: false
columns[10][search][value]: 
columns[10][search][regex]: false
start: 30
length: 15
search[value]: 
search[regex]: false
CreatedOnFrom: 
CreatedOnTo: 
SearchText: 
SearchStoreId: 0
SearchProductId: 0
SearchApprovedId: 0
__RequestVerificationToken: CfDJ8D_fpcUcCj5F

*/
