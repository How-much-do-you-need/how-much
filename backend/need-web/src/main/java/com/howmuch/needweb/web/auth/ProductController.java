package com.howmuch.needweb.web.auth;


import com.howmuch.needweb.service.ProductService;
import com.howmuch.needweb.vo.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.StringReader;
import java.util.Map;

@RestController
@RequestMapping("/product/")
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping("write")
    public void write(Product product, )

    @GetMapping("list")
    public void list(Model model) throws Exception{
        model.addAttribute("products", productService.list());
    }

    @GetMapping("detail")
    public void detail(String prod_no, Map map) throws Exception{
        Product product = productService.get(prod_no);

        if (product == null){
            throw new Exception("해당 게시물은 존재하지 않습니다.");
        }

        map.put("product", product);
    }

    @PostMapping("update")
    public String update(Product product) throws Exception{
        if(!productService.update(product)){
            throw new Exception("상품 정보 변경 오류입니다.");
        }
        return "redirect:list";
    }

    @GetMapping("delete")
    public String delete(String prod_id) throws Exception{
        if(!productService.delete(prod_id)){
            throw new Exception("상품 삭제 오류입니다.");
        }
        return "redirect:list";
    }

}
