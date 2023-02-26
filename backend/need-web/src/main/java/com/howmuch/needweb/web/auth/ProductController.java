package com.howmuch.needweb.web.auth;


import com.howmuch.needweb.service.ButtonService;
import com.howmuch.needweb.service.MemberService;
import com.howmuch.needweb.service.ProductService;
import com.howmuch.needweb.vo.Button;
import com.howmuch.needweb.vo.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/product/")
public class ProductController {

    @Autowired
    MemberService memberService;
    @Autowired
    ProductService productService;
    @Autowired
    ButtonService buttonService;

    @GetMapping("all")
    public List<Product> list() throws Exception{
        System.out.println("Product List");
        return productService.list();
    }
    @PostMapping("write")
    public void write(@RequestBody Product product) throws Exception {
        System.out.println("product = " + product);
        productService.insert(product);
        // 버튼 컬럼도 자동으로 생성되어야 한다.
        int prod_no = productService.findProdNo(product.getId());
        System.out.println("prod_no = " + prod_no);
        System.out.println("product.getId() = " + product.getId());
        buttonService.makeBtnColumn(product.getId(), prod_no);
    }
    @PostMapping("detail")
    public Product detail(int prod_no) throws Exception{
        Product product = productService.get(prod_no);

        if (product == null){
            throw new Exception("해당 게시물은 존재하지 않습니다.");
        }

        return product;
    }

    @PostMapping("updatePrice")
    public void updatePrice(@RequestBody Product product) throws Exception{
        if(!productService.updatePrice(product)){
            throw new Exception("가격 정보 변경 오류입니다.");
        }
        return;
    }
    @GetMapping("delete")
    public String delete(int prod_id) throws Exception{
        if(!productService.delete(prod_id)){
            throw new Exception("상품 삭제 오류입니다.");
        }
        return "redirect:list";
    }

    @PostMapping("findName")
    @ResponseBody
    public List<Product> findId(String id)  throws Exception {
        Map<String, String> map = new HashMap();
        map.put("id", id);
        List<Product> product = productService.searchWriter(id);
        if (product == null) {
            System.out.println("게시물이 존재하지 않습니다.");
            return null;
        }
        return product;
    }

    // 버튼 로직
    @PutMapping("button")
    public void pushBtn(Button button) throws Exception {
        buttonService.updateBtnStatus(button);
    }


}
