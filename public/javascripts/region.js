/**
 * Created by john on 16/4/19.
 */
/* $Id : region.js 4865 2007-01-31 14:04:10Z paulgao $ */

var region = new Object();

region.isAdmin = false;
var jDB;
function getRegion(){
    var regions;
    $.ajaxSettings.async = false;
    $.getJSON("/javascripts/region.json", {}, function(data){
        regions=data;
    }, 'json');
    return regions;
}
jDB = jsonDB(getRegion(),'address').init('DB');
function getRegionNameById(region_id){
    result =DB.query('select region_name from address where (region_id="'+region_id+'")');
    return result[0].region_name;
}
region.loadRegions = function(parent, type, target)
{
    /*$.get(region.getFileName(), {type:type, target:target, parent:parent}, function(data){
     var jDB = jsonDB(data,'address').init('DB');
     //查询年龄最小的两个人
     result =DB.query('select * from user order by birthday.year desc limit 2');
     region.response(data, '');
     }, 'json');*/
    result =DB.query('select * from address where (parent_id="'+parent+'" and region_type="'+type+'")');
    var data={};
    data.regions=result;
    data.type=type;
    data.target=target;
    //console.log(result);
    region.response(data, '');
    //Ajax.call(region.getFileName(), 'type=' + type + '&target=' + target + "&parent=" + parent , region.response, "GET", "JSON");
}

/* *
 * 载入指定的国家下所有的省份
 *
 * @country integer     国家的编号
 * @selName string      列表框的名称
 */
region.loadProvinces = function(country, selName)
{
    var objName = (typeof selName == "undefined") ? "provinceId_m" : selName;

    region.loadRegions(country, 1, objName);
}

/* *
 * 载入指定的省份下所有的城市
 *
 * @province    integer 省份的编号
 * @selName     string  列表框的名称
 */
region.loadCities = function(province, selName)
{
    var objName = (typeof selName == "undefined") ? "cityId_m" : selName;

    region.loadRegions(province, 2, objName);
}

/* *
 * 载入指定的城市下的区 / 县
 *
 * @city    integer     城市的编号
 * @selName string      列表框的名称
 */
region.loadDistricts = function(city, selName)
{
    var objName = (typeof selName == "undefined") ? "areaId_m" : selName;

    region.loadRegions(city, 3, objName);
}

/* *
 * 处理下拉列表改变的函数
 *
 * @obj     object  下拉列表
 * @type    integer 类型
 * @selName string  目标列表框的名称
 */
region.changed = function(obj, type, selName)
{
    var parent = obj.options[obj.selectedIndex].value;

    region.loadRegions(parent, type, selName);
}

region.response = function(result, text_result)
{
    var sel = document.getElementById(result.target);

    sel.length = 1;
    sel.selectedIndex = 0;
    //sel.style.display = (result.regions.length == 0 && ! region.isAdmin && result.type + 0 == 3) ? "none" : '';

    if (document.all)
    {
        sel.fireEvent("onchange");
    }
    else
    {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent('change', true, true);
        sel.dispatchEvent(evt);
    }

    if (result.regions)
    {
        for (i = 0; i < result.regions.length; i ++ )
        {
            var opt = document.createElement("OPTION");
            opt.value = result.regions[i].region_id;
            opt.text  = result.regions[i].region_name;

            sel.options.add(opt);
        }
    }
}

region.getFileName = function()
{
    return "/javascripts/region.json";
    /*if (region.isAdmin)
     {
     return "../region.php";
     }
     else
     {
     return "region.php";
     }*/
}
